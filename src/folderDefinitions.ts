import pluralize from 'pluralize';
import { getHasExpanded } from './getHasExpanded';
import { getIconPath } from './getIconPath';
import { getName } from './getNames';
import type { IconTheme } from './types/iconTheme';

export function generateFolders(theme: IconTheme) {
  const { prefix, suffix, separator } = theme;

  const { expandedIconPath, folderIconPath } = getIconPath(theme);

  let hasExpanded = false;

  try {
    hasExpanded = getHasExpanded(theme);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      process.exit(1);
    }
  }

  const folders = Object.keys(theme.folders);

  const folder = getName({
    item: theme.defaultIcons.folder,
    prefix: prefix?.folder,
    suffix: suffix?.folder,
    separator,
  });

  const folderKey = 'd';

  const rootFolder = getName({
    item: theme.defaultIcons.rootFolder,
    prefix: prefix?.folder,
    suffix: suffix?.folder,
    separator,
  });

  const rootFolderKey = 'r';

  let folderExpanded = folder;
  let folderExpandedKey = folderKey;
  let rootFolderExpanded = rootFolder;
  let rootFolderExpandedKey = rootFolderKey;

  if (hasExpanded) {
    folderExpanded = getName({
      item: theme.defaultIcons.folder,
      prefix: prefix?.expanded,
      suffix: suffix?.expanded,
      separator,
    });

    folderExpandedKey = 'D';

    rootFolderExpanded = getName({
      item: theme.defaultIcons.rootFolder,
      prefix: prefix?.expanded,
      suffix: suffix?.expanded,
      separator,
    });

    rootFolderExpandedKey = 'R';
  }

  const initialInfo = {
    [folderKey]: { iconPath: `${folderIconPath}/${folder}.svg` },
    [rootFolderKey]: { iconPath: `${folderIconPath}/${rootFolder}.svg` },
    [folderExpandedKey]: {
      iconPath: `${expandedIconPath}/${folderExpanded}.svg`,
    },
    [rootFolderExpandedKey]: {
      iconPath: `${expandedIconPath}/${rootFolderExpanded}.svg`,
    },
  };

  const folderDefinitions = folders.reduce((acc, item) => {
    const folderName = getName({
      item,
      prefix: prefix?.folder,
      suffix: suffix?.folder,
      separator,
    });

    acc[`d${folders.indexOf(item)}`] = {
      iconPath: `${folderIconPath}/${folderName}.svg`,
    };

    if (hasExpanded) {
      if (prefix?.folder && !prefix?.expanded) {
        prefix.expanded = prefix.folder;
      }

      if (suffix?.folder && !suffix?.expanded) {
        suffix.expanded = suffix.folder;
      }

      const folderNameExpanded = getName({
        item,
        prefix: prefix?.expanded,
        suffix: suffix?.expanded,
        separator,
      });

      acc[`D${folders.indexOf(item)}`] = {
        iconPath: `${expandedIconPath}/${folderNameExpanded}.svg`,
      };
    }

    return acc;
  }, initialInfo);

  const folderNames: Record<string, string> = {};

  const pluralizedFolders = Object.entries(theme.folders).reduce(
    (acc, [key, values]) => {
      acc[key] = values.reduce((arr, value) => {
        arr.push(value, pluralize(value));

        return arr;
      }, [] as string[]);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  for (const [key, values] of Object.entries(pluralizedFolders)) {
    for (const value of values) {
      const folderNameInfo = `d${folders.indexOf(key)}`;

      folderNames[`${value}`] = folderNameInfo;
      folderNames[`.${value}`] = folderNameInfo;
      folderNames[`_${value}`] = folderNameInfo;
      folderNames[`(${value})`] = folderNameInfo;
      folderNames[`__${value}__`] = folderNameInfo;
    }
  }

  const folderNamesExpanded = { ...folderNames };

  if (hasExpanded) {
    for (const [key, values] of Object.entries(pluralizedFolders)) {
      for (const value of values) {
        const folderNameExpandedInfo = `D${folders.indexOf(key)}`;

        folderNamesExpanded[`${value}`] = folderNameExpandedInfo;
        folderNamesExpanded[`.${value}`] = folderNameExpandedInfo;
        folderNamesExpanded[`_${value}`] = folderNameExpandedInfo;
        folderNamesExpanded[`(${value})`] = folderNameExpandedInfo;
        folderNamesExpanded[`__${value}__`] = folderNameExpandedInfo;
      }
    }
  }

  return {
    defaultInfoFolder: {
      folder: folderKey,
      rootFolder: rootFolderKey,
      folderExpanded: folderExpandedKey,
      rootFolderExpanded: rootFolderExpandedKey,
    },
    folderDefinitions,
    folderNames,
    folderNamesExpanded,
  };
}
