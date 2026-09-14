

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        cloudinaryUrl?: string;
        cloudinaryPublicId?: string;
      }
    }

    interface Locals {
      user?: Record<string, unknown>;
    }
  }
}

export {};
