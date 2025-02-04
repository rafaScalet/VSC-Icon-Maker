import type { IconTheme } from './types/iconTheme';

export function getHasExpanded(theme: IconTheme): boolean {
  const { prefix, suffix } = theme;

  if (typeof theme.iconsPath === 'object') {
    if (prefix?.expanded && !theme.iconsPath.expanded) {
      throw new Error(
        'you need to specify iconsPath.expanded if you are using prefix.expanded',
      );
    }

    if (suffix?.expanded && !theme.iconsPath.expanded) {
      throw new Error(
        'you need to specify iconsPath.expanded if you are using suffix.expanded',
      );
    }

    if (theme.iconsPath.expanded && !(suffix?.expanded || prefix?.expanded)) {
      throw new Error(
        'you need to specify prefix.expanded or suffix.expanded if you are using iconsPath.expanded key',
      );
    }

    if (!suffix?.expanded && !prefix?.expanded) return false;

    return true;
  }

  if (theme.iconsPath && !(suffix?.expanded || prefix?.expanded)) {
    throw new Error(
      'you need to specify prefix.expanded or suffix.expanded if you are using iconsPath as a string',
    );
  }

  if (suffix) if (suffix.expanded === suffix.folder) return false;

  if (prefix) if (prefix?.expanded === prefix?.folder) return false;

  return true;
}
