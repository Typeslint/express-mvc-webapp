import { NextFunction, Request, Response } from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { uploadPhotoProfile, userMembership } from "../utils/interface";

const profile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                username: true,
                email: true,
                Profile: true,
                Membership: true
            }
        });

        return res.status(200).json({
            status: 200,
            message: "OK",
            ...user
        });
    } catch (error) {
        next(error);
    }
};

const transaction = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const order = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                Order: {
                    orderBy: {
                        tanggal: "desc"
                    }
                }
            }
        });

        return res.status(200).json({
            status: 200,
            message: "OK",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

const uploadPhoto = async (req: Request<unknown, never, uploadPhotoProfile>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { photo, backgroundPhoto } = req.body;
        const users = await prisma.user.findUnique({
            where: {
                username: req.session.username
            }
        }).Profile();

        await prisma.profile.update({
            data: {
                photo: photo ? photo : users?.photo,
                backgroundphoto: backgroundPhoto ? backgroundPhoto : users?.backgroundphoto
            },
            where: {
                userId: users?.userId
            }
        });

        return res.status(201).json({
            status: 201,
            message: "Created"
        });
    } catch (error) {
        next(error);
    }
};

const membership = async (req: Request<unknown, never, userMembership>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { type } = req.body;
        const users = await prisma.user.findUnique({
            where: {
                username: req.session.username
            }
        });

        if (!users) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
        }

        await prisma.membership.upsert({
            create: {
                userId: users.id,
                type: type,
                is_member: true
            },
            update: {
                type: type,
                is_member: true
            },
            where: {
                userId: users?.id
            }
        });

        return res.status(200).json({
            status: 200,
            message: "OK"
        });
    } catch (error) {
        next(error);
    }
};

const deleteMembership = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const users = await prisma.user.findUnique({
            where: {
                username: req.session.username
            }
        });

        if (!users) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
        }

        await prisma.membership.update({
            data: {
                type: "undefined",
                is_member: false
            },
            where: {
                userId: users?.id
            }
        });

        return res.status(200).json({
            status: 200,
            message: "OK"
        });
    } catch (error) {
        next(error);
    }
};

export {
    profile,
    transaction,
    uploadPhoto,
    membership,
    deleteMembership
};
