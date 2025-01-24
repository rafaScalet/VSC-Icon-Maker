import { getName } from './getNames';
import type { IconTheme } from './types/iconTheme';

export function generateFiles(theme: IconTheme) {
  const { prefix, suffix, separator, iconsPath } = theme;

  const files = Object.keys(theme.files);

  const file = getName({
    item: theme.defaultIcons.file,
    prefix: prefix?.file,
    suffix: suffix?.file,
    separator,
  });

  const initialInfo = {
    [file]: { iconPath: `${iconsPath.file}/${file}.svg` },
  };

  const fileDefinitions = files.reduce((acc, item) => {
    const fileName = getName({
      item,
      prefix: prefix?.file,
      suffix: suffix?.file,
      separator,
    });

    acc[fileName] = {
      iconPath: `${iconsPath.file}/${fileName}.svg`,
    };

    return acc;
  }, initialInfo);

  const tempResult = {
    fileExtensions: {},
    languageIds: {},
    fileNames: {},
  };

  for (const file in theme.files) {
    const fileIconType = theme.files[file];

    if (!fileIconType) continue;

    if (fileIconType.ext) {
      for (const ext of fileIconType.ext) {
        tempResult.fileExtensions[ext] = getName({
          item: file,
          prefix: prefix?.file,
          suffix: suffix?.file,
          separator,
        });
      }
    }

    if (fileIconType.langId) {
      for (const langId of fileIconType.langId) {
        tempResult.languageIds[langId] = getName({
          item: file,
          prefix: prefix?.file,
          suffix: suffix?.file,
          separator,
        });
      }
    }

    if (fileIconType.name) {
      for (const name of fileIconType.name) {
        tempResult.fileNames[name] = getName({
          item: file,
          prefix: prefix?.file,
          suffix: suffix?.file,
          separator,
        });
      }
    }
  }

  const { fileExtensions, fileNames, languageIds } = tempResult;

  return {
    defaultInfoFile: { file },
    fileDefinitions,
    fileExtensions,
    fileNames,
    languageIds,
  };
}
