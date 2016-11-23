export function passedTimeMessage(startTime: number): string {
  const passedTime = new Date().getTime() - startTime;
  return `passed time: ${passedTime}ms ${passedTime / 1000}s`;
}
