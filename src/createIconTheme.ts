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

createIconTheme({
  filePath: 'src/test.json',
  defaultIcons: {
    file: 'icon',
    folder: 'icon',
    rootFolder: 'root',
  },
  files: {
    js: {
      ext: ['js', 'cjs', 'mjs'],
      langId: ['javascript'],
      name: ['jsconfig.json'],
    },
    ts: {
      ext: ['ts', 'cts', 'mts'],
      langId: ['typescript'],
      name: ['tsconfig.json'],
    },
  },
  folders: {
    vscode: ['vscode'],
    models: ['models'],
  },
  suffix: {
    folder: '',
    file: '',
    expanded: 'expanded',
  },
  prefix: {
    folder: 'folder',
    expanded: 'folder',
    file: 'file',
  },
  separator: '-',
  iconsPath: {
    file: 'src/file',
    folder: 'src/folder',
    expanded: 'src/folder',
  },
});
