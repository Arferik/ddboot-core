export function hideWords(cc: string, num = 4, len = 32, mask = '*'): string {
  return cc.slice(-num).padStart(len, mask);
}

export const hidePath = (pathName: string) => {
  return pathName
    .split('/')
    .map((name: string, index: number) => {
      if (index === 0) {
        return '****';
      }
      return name;
    })
    .join('/');
};
