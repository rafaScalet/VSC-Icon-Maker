import { writeFile } from 'node:fs';
import type { IconTheme } from './types/IconTheme';

export function iconTheme(theme: IconTheme) {
  writeFile(theme.filePath, JSON.stringify(theme), (err) => {
    if (err) throw err;

    console.log(`the file theme has been saved at ${theme.filePath}`);
  });
}

iconTheme({
  filePath: 'src/test.json',
  defaultIcons: {
    file: 'file',
    folder: 'folder',
    rootFolder: 'root',
  },
  files: {},
  folders: {},
  iconsPath: {
    file: 'src/file',
    folder: 'src/folder',
  },
});
