import "express";

declare global {
  namespace Express {
    interface User {
      publicId: string;
      name: string;
      email: string;
      verified: boolean;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};