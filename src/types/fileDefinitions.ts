/**
 * definition of file icon names and when they will be used
 */
export type FileDefinitions = {
  [fileIconName: string]: {
    /**
     * extension that will be used for icons. e.g: ['config.js', 'config.mjs', 'config.cjs']
     */
    ext?: string[];
    /**
     * a specific name for the icon. e.g: ['package.json', 'package-lock.json']
     */
    name?: string[];
    /**
     * vscode language id for the icon. e.g: ['javascript']
     */
    langId?: string[];
  };
};
