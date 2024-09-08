import { unlink } from "fs/promises";

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await unlink(filePath);
  } catch (error) {
    console.error(`Error al eliminar el archivo: ${filePath}`, error);
    throw error;
  }
};
