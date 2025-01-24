import { writeFile } from 'node:fs';
import { generateFolders } from './folderDefinitions';
import type { IconTheme } from './types/iconTheme';

export function createIconTheme(theme: IconTheme) {
  const { folderDefinitions, ...folderRest } = generateFolders(theme);

  const iconDefinitions = { ...folderDefinitions };

  const iconTheme = { iconDefinitions, ...folderRest };

  writeFile(theme.filePath, JSON.stringify(iconTheme), (err) => {
    if (err) throw err;

    console.log(`the file theme has been saved at ${theme.filePath}`);
  });
}

createIconTheme({
  filePath: 'src/test.json',
  defaultIcons: {
    file: 'file',
    folder: 'folder',
    rootFolder: 'root',
  },
  files: {},
  folders: {
    vscode: ['vscode'],
    models: ['models'],
  },
  prefix: {
    folder: 'folder',
    file: 'file',
  },
  separator: '-',
  iconsPath: {
    file: 'src/file',
    folder: 'src/folder',
  },
});
