import "express";

declare global {
  namespace Express {
    interface User {
      publicId: string;
      name: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
