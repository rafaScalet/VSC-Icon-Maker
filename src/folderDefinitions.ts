import { getHasExpanded } from './getHasExpanded';
import { getName } from './getNames';
import type { IconTheme } from './types/iconTheme';

export function generateFolders(theme: IconTheme) {
  const { prefix, suffix, separator, iconsPath } = theme;

  let hasExpanded: boolean;

  try {
    hasExpanded = getHasExpanded(theme);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }

  const folders = Object.keys(theme.folders);

  const folderDefinitions = folders.reduce((acc, item) => {
    const folderName = getName({
      item,
      prefix: prefix?.folder,
      suffix: suffix?.folder,
      separator,
    });

    acc[folderName] = {
      iconPath: `${iconsPath.folder}/${folderName}.svg`,
    };

    if (hasExpanded) {
      const folderNameExpanded = getName({
        item,
        prefix: prefix?.expanded,
        suffix: suffix?.expanded,
        separator,
      });

      acc[folderNameExpanded] = {
        iconPath: `${iconsPath.expanded}/${folderNameExpanded}.svg`,
      };
    }

    return acc;
  }, {});

  const folderNames: Record<string, string> = {};

  for (const [key, values] of Object.entries(theme.folders)) {
    for (const value of values) {
      const folderNameInfo = {
        item: key,
        prefix: prefix?.folder,
        suffix: suffix?.folder,
        separator: separator,
      };
      folderNames[`${value}`] = getName(folderNameInfo);
      folderNames[`.${value}`] = getName(folderNameInfo);
      folderNames[`_${value}`] = getName(folderNameInfo);
      folderNames[`__${value}__`] = getName(folderNameInfo);
    }
  }

  const folderNamesExpanded = { ...folderNames };

  if (hasExpanded) {
    for (const [key, values] of Object.entries(theme.folders)) {
      for (const value of values) {
        const folderNameExpandedInfo = {
          item: key,
          prefix: prefix?.expanded || '',
          suffix: suffix?.expanded || '',
          separator,
        };
        folderNamesExpanded[`${value}`] = getName(folderNameExpandedInfo);
        folderNamesExpanded[`.${value}`] = getName(folderNameExpandedInfo);
        folderNamesExpanded[`_${value}`] = getName(folderNameExpandedInfo);
        folderNamesExpanded[`__${value}__`] = getName(folderNameExpandedInfo);
      }
    }
  }

  return {
    folder: theme.defaultIcons.folder,
    folderExpanded: theme.defaultIcons.folder,
    rootFolder: theme.defaultIcons.rootFolder,
    rootFolderExpanded: theme.defaultIcons.rootFolder,
    folderDefinitions,
    folderNames,
    folderNamesExpanded,
  };
}
