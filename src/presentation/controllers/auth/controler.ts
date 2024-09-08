import { AuthService } from "../../service/auth.service";
import { Request, Response } from "express";
import { User } from "./user.interface";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public signUp = async (req: Request, res: Response) => {
    try {
      const { email, password }: User = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const newUser = await this.authService.registerUser({ email, password });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public logIn = async (req: Request, res: Response) => {
    try {
      const { email, password }: User = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await this.authService.loginUser({ email, password });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
