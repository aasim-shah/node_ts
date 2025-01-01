import { Request, Response, NextFunction } from "express";

class ResError extends Error {
    statusCode: number;
    success: boolean;
    errors: any[];

    constructor(statusCode: number, message: string = "Something went wrong", errors: any[] = []) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ResSuccess {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(data: any, message: string = "Success") {
        this.statusCode = 200;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status((error as { statusCode?: number }).statusCode || 500).json({
                success: false,
                message: (error as Error).message,
            });
        }
    };
};

export { ResError, ResSuccess, asyncHandler };
