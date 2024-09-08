import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid bearer token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JWTAdapter.validateToken<{ token: string }>(token);

      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }

      next();
    } catch (error) {
      console.error("Error validating token:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
