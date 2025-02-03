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
    [folder]: { iconPath: `${folderIconPath}/${folder}.svg` },
    [rootFolder]: { iconPath: `${folderIconPath}/${rootFolder}.svg` },
    [folderExpanded]: {
      iconPath: `${expandedIconPath}/${folderExpanded}.svg`,
    },
    [rootFolderExpanded]: {
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

    acc[folderName] = {
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

      acc[folderNameExpanded] = {
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
      const folderNameInfo = getName({
        item: key,
        prefix: prefix?.folder,
        suffix: suffix?.folder,
        separator: separator,
      });

      folderNames[`${value}`] = folderNameInfo;
      folderNames[`.${value}`] = folderNameInfo;
      folderNames[`_${value}`] = folderNameInfo;
      folderNames[`(${value})`] = folderNameInfo;
      folderNames[`__${value}__`] = folderNameInfo;
    }
  }

  const folderNamesExpanded = { ...folderNames };

  if (hasExpanded) {
    for (const [key, values] of Object.entries(theme.folders)) {
      for (const value of values) {
        const folderNameExpandedInfo = getName({
          item: key,
          prefix: prefix?.folder,
          suffix: suffix?.folder,
          separator: separator,
        });

        folderNames[`${value}`] = folderNameExpandedInfo;
        folderNames[`.${value}`] = folderNameExpandedInfo;
        folderNames[`_${value}`] = folderNameExpandedInfo;
        folderNames[`(${value})`] = folderNameExpandedInfo;
        folderNames[`__${value}__`] = folderNameExpandedInfo;
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
