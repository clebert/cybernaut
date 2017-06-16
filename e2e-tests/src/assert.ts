export async function rejects<T>(
  promise: Promise<T>,
  message: RegExp
): Promise<void> {
  let error: Error | undefined;

  try {
    await promise;
  } catch (e) {
    error = e;
  }

  if (!error || !message.test(error.message)) {
    throw new Error('Missing expected exception');
  }
}
