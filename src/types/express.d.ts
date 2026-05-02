import { User } from "./utils.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
