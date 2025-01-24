import type { IconName } from './types/iconName';

export function getName(data: IconName) {
  const { item, prefix, suffix } = data;

  const separator = data.separator ? data.separator : '';

  if (prefix && suffix) {
    return `${prefix}${separator}${item}${separator}${suffix}`;
  }
  if (prefix) {
    return `${prefix}${separator}${item}`;
  }
  if (suffix) {
    return `${item}${separator}${suffix}`;
  }
  return item;
}
