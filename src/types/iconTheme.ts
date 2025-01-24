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
  iconsPath: {
    /**
     * path for file icons
     */
    file: string;
    /**
     * path for folder icons
     */
    folder: string;
    /**
     * path for expanded folder icons
     */
    expanded?: string;
  };
  /**
   * default icons for file, folder and rootFolder
   */
  defaultIcons: {
    /**
     * default icon for files
     */
    file: string;
    /**
     * default icon for folders
     */
    folder: string;
    /**
     * default icon for root folders (used on vscode workspaces)
     */
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
  prefix?: {
    /**
     * prefix for files
     */
    file: string;
    /**
     * prefix for folders
     */
    folder: string;
    /**
     * prefix for folders when they are expanded
     */
    expanded?: string;
  };
  /**
   * suffix to be used when generating icon paths
   */
  suffix?: {
    /**
     * suffix for files
     */
    file: string;
    /**
     * suffix for folders
     */
    folder: string;
    /**
     * suffix for folders when they are expanded
     */
    expanded?: string;
  };
  /**
   * separator to be used when generating icon paths
   */
  separator?: string;
};
