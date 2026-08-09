export type RateLimitConfig = {
  windowMs: number;
  max: number;
};

export type RateLimitResult = {
  ok: boolean;
  retryAfterMs: number;
};

// ---------------------------------------------------------------------------
// Durable store: Upstash Redis (REST API, no SDK required).
// Falls back to an in-memory sliding window when Upstash is not configured.
// ---------------------------------------------------------------------------

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const memoryStore = new Map<string, number[]>();

function pruneMemory(now: number): void {
  for (const [key, timestamps] of memoryStore) {
    const last = timestamps[timestamps.length - 1];
    if (last !== undefined && last < now - 60_000) {
      memoryStore.delete(key);
    }
  }
}

async function checkUpstash(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return checkMemory(key, config);
  }

  const ttlSeconds = Math.max(1, Math.ceil(config.windowMs / 1000));

  try {
    const response = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, ttlSeconds, 'NX'],
      ]),
    });

    if (!response.ok) return checkMemory(key, config);

    const data = (await response.json()) as Array<{ result?: number | string; error?: string }>;
    const first = data[0];
    const count = first && typeof first.result === 'number' ? first.result : 0;

    if (count > config.max) {
      return { ok: false, retryAfterMs: config.windowMs };
    }
    return { ok: true, retryAfterMs: 0 };
  } catch {
    return checkMemory(key, config);
  }
}

function checkMemory(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  pruneMemory(now);

  const timestamps = (memoryStore.get(key) ?? []).filter((t) => now - t < config.windowMs);

  if (timestamps.length >= config.max) {
    const first = timestamps[0];
    const retryAfterMs = first !== undefined ? config.windowMs - (now - first) : config.windowMs;
    memoryStore.set(key, timestamps);
    return { ok: false, retryAfterMs };
  }

  timestamps.push(now);
  memoryStore.set(key, timestamps);
  return { ok: true, retryAfterMs: 0 };
}

export async function rateLimit(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
  return checkUpstash(key, config);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}
