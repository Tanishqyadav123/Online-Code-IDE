import fs from "fs/promises";
import path from "path";

export const createFolderIfNotExist = async (folderName: string) => {
  const projectDirPath = path.join(process.cwd(), folderName);
  try {
    await fs.mkdir(projectDirPath);
  } catch (error) {
    console.log("Already `Projects` Folder Exist , Skipping...");
  }
};
