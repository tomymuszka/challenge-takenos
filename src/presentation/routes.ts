import { Router } from "express";
import { TransactionsRoutes } from "./controllers/transactions/routes";
import { AnalysisRoutes } from "./controllers/analysis/routes";
import { AuthRoutes } from "./controllers/auth/routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.Routes);

    router.use(AuthMiddleware.validateJWT);
    router.use("/transactions", TransactionsRoutes.Routes);
    router.use("/analysis", AnalysisRoutes.Routes);

    return router;
  }
}
