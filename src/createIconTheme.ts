import { writeFile } from 'node:fs';
import { generateFiles } from './fileDefinitions';
import { generateFolders } from './folderDefinitions';
import type { IconTheme } from './types/iconTheme';

export function createIconTheme(theme: IconTheme) {
  const { folderDefinitions, defaultInfoFolder, ...folderRest } =
    generateFolders(theme);
  const { fileDefinitions, defaultInfoFile, ...fileRest } =
    generateFiles(theme);

  const iconDefinitions = { ...fileDefinitions, ...folderDefinitions };

  const iconTheme = {
    ...defaultInfoFile,
    ...defaultInfoFolder,
    iconDefinitions,
    ...folderRest,
    ...fileRest,
  };

  writeFile(theme.filePath, JSON.stringify(iconTheme), (err) => {
    if (err) throw err;

    console.log(`the file theme has been saved at ${theme.filePath}`);
  });
}
