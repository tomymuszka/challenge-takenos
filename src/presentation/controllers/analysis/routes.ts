import { Router } from "express";
import { AnalysisService } from "../../service/analisis.service";
import { AnalysisController } from "./controller";

export class AnalysisRoutes {
  static get Routes(): Router {
    const router = Router();

    const analysisService = new AnalysisService();
    const analysis = new AnalysisController(analysisService);

    router.get("/:id", analysis.getAnalysis);

    return router;
  }
}
