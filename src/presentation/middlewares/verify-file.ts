import { UploadedFile } from "express-fileupload";
import { Request, Response, NextFunction } from "express";

export const validateFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.files?.file as UploadedFile;

  if (!req.files || !req.files.file || Array.isArray(req.files.file)) {
    return res
      .status(400)
      .json(
        "No file uploaded or multiple files under the same field name are not supported."
      );
  }

  const fileExtension = file.mimetype.split("/").at(1) || "";
  if (fileExtension !== "csv") {
    return res
      .status(400)
      .json(
        `The extension ${fileExtension} is not valid. Please upload a file in csv.`
      );
  }

  if (file.mimetype !== "text/csv") {
    return res.status(400).json("El archivo subido no es un CSV válido.");
  }

  if (file.size === 0) {
    return res.status(400).json("El archivo CSV está vacío.");
  }

  next();
};
