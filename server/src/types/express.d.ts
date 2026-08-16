// Cloudinary upload results get stashed onto req.file by the upload
// middlewares (src/middlewares/fileUpload.ts) — this augments Multer's own
// File type so the rest of the app can read them without casting.
declare global {
  namespace Express {
    namespace Multer {
      interface File {
        cloudinaryUrl?: string;
        cloudinaryPublicId?: string;
      }
    }
    // The decoded JWT/User payload verifyRefreshToken and adminAccess attach
    // to res.locals — same loosely-shaped object the app has always passed
    // around here, just given a name instead of leaving it implicit any.
    interface Locals {
      user?: Record<string, unknown>;
    }
  }
}

export {};
