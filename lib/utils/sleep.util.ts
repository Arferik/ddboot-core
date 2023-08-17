export function sleep(time = 2000) {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(), time);
  });
}
