import { NextFunction, Request, Response } from "../app";

const checkSession = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session.username) {
        res.status(401).json({
            status: 401,
            message: "Kamu masih login menggunakan " + req.session.username
        });
        return;
    }

    next();
};

const restrict = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session.username) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }

    next();
};

export {
    checkSession,
    restrict
};
