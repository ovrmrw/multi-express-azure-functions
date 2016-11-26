export function createHelloMessage(name?: string): string {
  return 'Hello world, ' + (name || 'you') + '. ' + new Date().getTime();
}


export function createWelcomeMessage(): string {
  return 'This is root. ' + new Date().getTime();
}
