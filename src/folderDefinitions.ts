import { getName } from './getNames';
import type { IconTheme } from './types/IconTheme';

export function generateFolders(theme: IconTheme) {
  const folders = Object.keys(theme.folders);

  const folderDefinitions = folders.reduce((acc, item) => {
    const folderName = getName({
      item,
      prefix: theme.prefix?.folder,
      suffix: theme.suffix?.folder,
      separator: theme.separator,
    });

    acc[folderName] = {
      iconPath: `${theme.iconsPath.folder}/${folderName}.svg`,
    };

    return acc;
  }, {});

  return { folderDefinitions };
}
