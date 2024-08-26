import { NextFunction, Request, Response } from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        return res.status(200).render("register/index");
    } catch (error) {
        next(error);
    }
};

const loginView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        return res.status(200).render("login/index");
    } catch (error) {
        next(error);
    }
};

const homeView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                id: true,
                username: true
            }
        });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        return res.status(200).render("home/index", { session: session });
    } catch (error) {
        next(error);
    }
};

const profileView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                id: true,
                username: true
            }
        });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const order = await prisma.user.findUnique({
            where: {
                username: session.username
            },
            select: {
                Order: true
            }
        }).Order();

        const profile = await prisma.user.findUnique({
            where: {
                username: session.username
            },
            select: {
                email: true,
                Membership: true,
                Profile: true
            }
        });

        return res.status(200).render("profile/index", { session: session, email: profile?.email, profile: profile?.Profile, membership: profile?.Membership, order: order });
    } catch (error) {
        next(error);
    }
};

const orderView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                id: true,
                username: true
            }
        });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        return res.status(200).render("order/index", { session: session });
    } catch (error) {
        next(error);
    }
};

const payView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = await prisma.user.findUnique({
            where: {
                username: req.session.username
            },
            select: {
                id: true,
                username: true
            }
        });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        return res.status(200).render("pay/index", { session: session });
    } catch (error) {
        next(error);
    }
};

export {
    registerView,
    loginView,
    homeView,
    profileView,
    orderView,
    payView
};
