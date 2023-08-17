export function hasItems(param: any[]): boolean {
  if (Array.isArray(param)) {
    return param.length > 0;
  }
  return false;
}
