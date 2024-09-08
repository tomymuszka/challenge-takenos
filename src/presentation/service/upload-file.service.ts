import { randomInt } from "crypto";
import { UploadedFile } from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { UploadedFileInfo } from "../interfaces/upload-file.interface";

export class UploadFileService {
  private checkFolder(folderPath: string) {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }
  }

  async uploadSingleFile(
    file: UploadedFile,
    folder: string = "uploads"
  ): Promise<UploadedFileInfo> {
    try {
      const fileExtension = file.mimetype.split("/").at(1)!;

      const destination = path.resolve(__dirname, "../", "../", "../", folder);
      this.checkFolder(destination);
      const fileName = `${randomInt(1000, 9099)}.${fileExtension}`;
      const finalPath = path.join(destination, fileName);
      await file.mv(finalPath);
      return { fileName, fileExtension, finalPath };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploads"
  ): Promise<UploadedFileInfo[]> {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingleFile(file, folder))
    );
    return fileNames;
  }
}
