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

  return {
    defaultInfoFile: { file },
    fileDefinitions,
  };
}
