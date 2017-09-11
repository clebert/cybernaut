export async function sleep(duration: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, duration));
}
