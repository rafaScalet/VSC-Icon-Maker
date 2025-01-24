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

  const folderNames: Record<string, string> = {};

  for (const [key, values] of Object.entries(theme.folders)) {
    for (const value of values) {
      const folderNameInfo = {
        item: key,
        prefix: theme.prefix?.folder,
        suffix: theme.suffix?.folder,
        separator: theme.separator,
      };
      folderNames[`${value}`] = getName(folderNameInfo);
      folderNames[`.${value}`] = getName(folderNameInfo);
      folderNames[`_${value}`] = getName(folderNameInfo);
      folderNames[`__${value}__`] = getName(folderNameInfo);
    }
  }

  return { folderDefinitions, folderNames };
}
