import { AnalysisService } from "../../service/analisis.service";
import { Request, Response } from "express";

export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  public getAnalysis = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Analysis ID is required and must be a positive number",
      });
    }

    try {
      const analysis = await this.analysisService.getAnalysis(id);

      if (!analysis) {
        return res
          .status(404)
          .json({ error: `Analysis with id ${id} was not found` });
      }

      res.status(200).json(analysis);
    } catch (error) {
      console.error("Error retrieving analysis:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
