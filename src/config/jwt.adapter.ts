import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JWTAdapter {
  static generateToken(paylod: any, duration: string = "2h") {
    return new Promise((resolve, reject) => {
      jwt.sign(paylod, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) {
          console.error("Error signing token:", err);
          return reject(err);
        }

        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
