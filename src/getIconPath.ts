import type { IconTheme } from './types/iconTheme';

export function getIconPath({ iconsPath }: IconTheme): {
  fileIconPath: string;
  folderIconPath: string;
  expandedIconPath: string;
} {
  if (typeof iconsPath === 'string') {
    return {
      fileIconPath: iconsPath,
      folderIconPath: iconsPath,
      expandedIconPath: iconsPath,
    };
  }

  return {
    fileIconPath: iconsPath.file,
    folderIconPath: iconsPath.folder,
    expandedIconPath: iconsPath.expanded,
  };
}
