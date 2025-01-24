import type { FileAndFolder } from './fileAndFolder';
import type { FileDefinitions } from './fileDefinitions';
import type { FolderDefinitions } from './folderDefinitions';

export type IconTheme = {
  /**
   * path for the json file to save the extension
   */
  filePath: string;
  /**
   * path to the directory of icons, can be a string for a unique directory or an object, for separate files and folders
   */
  iconsPath: FileAndFolder;
  /**
   * default icons for file, folder and rootFolder
   */
  defaultIcons: FileAndFolder & {
    rootFolder: string;
  };
  /**
   * object to set the icons of the files automatically
   */
  files: FileDefinitions;
  /**
   * object to set the icons of the folders automatically
   */
  folders: FolderDefinitions;
  /**
   * prefix to be used when generating icon paths
   */
  prefix?: FileAndFolder;
  /**
   * suffix to be used when generating icon paths
   */
  suffix?: FileAndFolder;
  /**
   * separator to be used when generating icon paths
   */
  separator?: string;
};
