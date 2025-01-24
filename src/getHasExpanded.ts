import type { IconTheme } from './types/iconTheme';

export function getHasExpanded({
  prefix,
  suffix,
  iconsPath,
}: IconTheme): boolean {
  if (prefix?.expanded && !iconsPath.expanded) {
    throw new Error(
      'you need to specify iconsPath.expanded if you are using prefix.expanded',
    );
  }

  if (suffix?.expanded && !iconsPath.expanded) {
    throw new Error(
      'you need to specify iconsPath.expanded if you are using suffix.expanded',
    );
  }

  if (iconsPath.expanded && !(suffix?.expanded && prefix?.expanded)) {
    throw new Error(
      'you need to specify prefix.expanded or suffix.expanded if you are using iconsPath.expanded',
    );
  }

  if (!(suffix?.expanded && prefix?.expanded)) return false;

  return true;
}
