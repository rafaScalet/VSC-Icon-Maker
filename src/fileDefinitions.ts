import { getIconPath } from './getIconPath';
import { getName } from './getNames';
import type { IconTheme } from './types/iconTheme';

export function generateFiles(theme: IconTheme) {
  const { prefix, suffix, separator } = theme;

  const { fileIconPath } = getIconPath(theme);

  const files = Object.keys(theme.files);

  const file = getName({
    item: theme.defaultIcons.file,
    prefix: prefix?.file,
    suffix: suffix?.file,
    separator,
  });

  const initialInfo: Record<string, { iconPath: string }> = {
    f: { iconPath: `${fileIconPath}/${file}.svg` },
  };

  const fileDefinitions = files.reduce((acc, item) => {
    const fileName = getName({
      item,
      prefix: prefix?.file,
      suffix: suffix?.file,
      separator,
    });

    acc[`f${files.indexOf(item)}`] = {
      iconPath: `${fileIconPath}/${fileName}.svg`,
    };

    return acc;
  }, initialInfo);

  const tempResult: {
    fileExtensions: Record<string, string>;
    languageIds: Record<string, string>;
    fileNames: Record<string, string>;
  } = {
    fileExtensions: {},
    languageIds: {},
    fileNames: {},
  };

  for (const file in theme.files) {
    const fileIconType = theme.files[file];

    if (!fileIconType) continue;

    const fileIndex = `f${files.indexOf(file)}`;

    if (fileIconType.ext) {
      for (const ext of fileIconType.ext) {
        tempResult.fileExtensions[ext] = fileIndex;
      }
    }

    if (fileIconType.langId) {
      for (const langId of fileIconType.langId) {
        tempResult.languageIds[langId] = fileIndex;
      }
    }

    if (fileIconType.name) {
      for (const name of fileIconType.name) {
        tempResult.fileNames[name] = fileIndex;
      }
    }
  }

  const { fileExtensions, fileNames, languageIds } = tempResult;

  return {
    defaultInfoFile: { file: 'f' },
    fileDefinitions,
    fileExtensions,
    fileNames,
    languageIds,
  };
}
