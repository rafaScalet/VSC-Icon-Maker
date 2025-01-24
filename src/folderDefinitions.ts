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

  const folder = getName({
    item: theme.defaultIcons.folder,
    prefix: prefix?.folder,
    suffix: suffix?.folder,
    separator,
  });

  const rootFolder = getName({
    item: theme.defaultIcons.rootFolder,
    prefix: prefix?.folder,
    suffix: suffix?.folder,
    separator,
  });

  let folderExpanded = folder;
  let rootFolderExpanded = rootFolder;

  if (hasExpanded) {
    folderExpanded = getName({
      item: theme.defaultIcons.folder,
      prefix: prefix?.expanded,
      suffix: suffix?.expanded,
      separator,
    });

    rootFolderExpanded = getName({
      item: theme.defaultIcons.rootFolder,
      prefix: prefix?.expanded,
      suffix: suffix?.expanded,
      separator,
    });
  }

  const initialInfo = {
    [folder]: { iconPath: `${iconsPath.folder}/${folder}.svg` },
    [rootFolder]: { iconPath: `${iconsPath.folder}/${rootFolder}.svg` },
    [folderExpanded]: { iconPath: `${iconsPath.folder}/${folderExpanded}.svg` },
    [rootFolderExpanded]: {
      iconPath: `${iconsPath.folder}/${rootFolderExpanded}.svg`,
    },
  };

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
  }, initialInfo);

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
          prefix: prefix?.expanded,
          suffix: suffix?.expanded,
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
    defaultInfoFolder: {
      folder,
      rootFolder,
      folderExpanded,
      rootFolderExpanded,
    },
    folderDefinitions,
    folderNames,
    folderNamesExpanded,
  };
}
