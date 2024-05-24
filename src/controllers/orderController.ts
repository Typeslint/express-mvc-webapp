import { NextFunction, Request, Response } from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { userOrder } from "../utils/interface";

const order = async (req: Request<unknown, never, userOrder>, res: Response, next: NextFunction): Promise<void> => {
    const { name, phone, address, qty, services, tanggal, total } = req.body;
    try {
        const users = await prisma.user.findUnique({
            where: {
                username: req.session.username
            }
        });

        if (!users) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }

        await prisma.order.create({
            data: {
                userId: users?.id,
                name: name,
                address: address,
                phone: phone,
                qty: Number(qty),
                services: services.service,
                delivery: services.delivery,
                tanggal: tanggal,
                total: Number(total)
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

export {
    order
};
