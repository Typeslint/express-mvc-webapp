import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "../app";
import { userData } from "../utils/interface";
import { defaultBackgroundPhoto, defaultProfilePhoto } from "../utils/base-64";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req: Request<unknown, never, userData>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, username, password } = req.body;
        const exist = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (exist) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const users = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: encryptedPassword
            }
        });

        await prisma.profile.create({
            data: {
                backgroundphoto: defaultBackgroundPhoto,
                photo: defaultProfilePhoto,
                userId: users.id
            }
        });

        await prisma.membership.create({
            data: {
                userId: users.id
            }
        });

        res.status(200).json({
            status: 200,
            message: "OK"
        });
        return;
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request<unknown, never, userData>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const users = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!users) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, users?.password);

        if (!isPasswordCorrect) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }

        if (!email || !password) {
            res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
            return;
        }

        if (!users) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }

        req.session.username = users.username;
        res.status(200).json({
            status: 200,
            message: "OK"
        });
        return;
    } catch (error) {
        next(error);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.session.username) {
            req.session.destroy(async () => {
                if (req.method === "GET") {
                    return res.redirect("/home");
                }

                res.status(200).json({
                    status: 200,
                    message: "Logout Success"
                });
                return;
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
            return;
        }
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    logout
};
