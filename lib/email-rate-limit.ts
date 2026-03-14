const RESEND_DELAY_MS = 600;
const RESEND_MAX_RETRIES = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const statusCode = 'statusCode' in error ? error.statusCode : undefined;
  const message = 'message' in error ? error.message : undefined;

  return (
    statusCode === 429 ||
    (typeof message === 'string' &&
      (message.toLowerCase().includes('rate limit') ||
        message.toLowerCase().includes('too many requests') ||
        message.toLowerCase().includes('2 request per second')))
  );
}

export async function sendWithResendThrottle<T>(send: () => Promise<{ error?: unknown; data?: T }>) {
  for (let attempt = 0; attempt < RESEND_MAX_RETRIES; attempt += 1) {
    if (attempt > 0) {
      await sleep(RESEND_DELAY_MS * (attempt + 1));
    }

    const response = await send();

    if (!response.error) {
      await sleep(RESEND_DELAY_MS);
      return response;
    }

    if (!isRateLimitError(response.error) || attempt === RESEND_MAX_RETRIES - 1) {
      await sleep(RESEND_DELAY_MS);
      return response;
    }
  }

  await sleep(RESEND_DELAY_MS);
  return { error: new Error('Unexpected retry flow exhaustion.') };
}
