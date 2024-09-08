import { Router } from "express";
import { AuthService } from "../../service/auth.service";
import { AuthController } from "./controler";

export class AuthRoutes {
  static get Routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const authController = new AuthController(authService);

    router.post("/signup", authController.signUp);
    router.post("/login", authController.logIn);

    return router;
  }
}
