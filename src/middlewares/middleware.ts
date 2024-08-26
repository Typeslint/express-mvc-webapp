import { NextFunction, Request, Response } from "../app";

const checkSession = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session.username) {
        return res.status(302).redirect(`${req.protocol}://${req.get("host")}`);
    }
    next();
};

const restrict = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session) {
        req.session.touch();
    }

    if (!req.session.username) {
        return res.status(302).redirect(`${req.protocol}://${req.get("host")}/login`);
    }
    next();
};

export {
    checkSession,
    restrict
};
