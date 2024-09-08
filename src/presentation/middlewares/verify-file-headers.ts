import csv from "csv-parser";
import { Readable } from "stream";
import { UploadedFile } from "express-fileupload";
import { Request, Response, NextFunction } from "express";

const requiredHeaders = [
  "transaction_id",
  "date",
  "user_id",
  "merchant",
  "amount",
];

export const validateCSVMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.files?.file as UploadedFile;

  const headers: string[] = [];
  const csvStream = Readable.from(file.data).pipe(csv());

  csvStream.on("error", (err) => {
    console.error("Error al procesar el archivo CSV:", err);
    return res.status(500).send("Error al procesar el archivo CSV.");
  });

  csvStream
    .on("headers", (headerRow) => {
      headers.push(...headerRow);
    })
    .on("end", () => {
      if (headers.length === 0) {
        return res.status(400).send("El archivo CSV no contiene encabezados.");
      }

      const missingHeaders = requiredHeaders.filter(
        (header) => !headers.includes(header)
      );
      if (missingHeaders.length > 0) {
        return res
          .status(400)
          .send(`Faltan los siguientes headers: ${missingHeaders.join(", ")}`);
      }

      next();
    })
    .on("data", (row) => {});
};
