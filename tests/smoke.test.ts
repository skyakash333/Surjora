import { describe, it, expect } from 'vitest';
import { slugify } from '@/lib/slug';
import { articleSchema } from '@/schema/article';
import { catalogSchema } from '@/schema/catalog';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('collapses non-alphanumeric runs', () => {
    expect(slugify('WeChat & QQ Accounts!')).toBe('wechat-qq-accounts');
  });

  it('strips leading and trailing dashes', () => {
    expect(slugify('--accounts--')).toBe('accounts');
  });
});

describe('articleSchema', () => {
  const base = {
    slug: 'my-article',
    title: 'A valid article title',
    categoryId: 'cat_1',
    status: 'DRAFT',
    body: [{ type: 'paragraph', data: { text: 'Hello' } }],
  };

  it('accepts a minimal valid article', () => {
    const result = articleSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it('accepts optional faqs and coverImageId', () => {
    const result = articleSchema.safeParse({
      ...base,
      faqs: [{ question: 'Q?', answer: 'A.' }],
      coverImageId: 'media_1',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid slug', () => {
    const result = articleSchema.safeParse({ ...base, slug: 'Invalid Slug!' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty body', () => {
    const result = articleSchema.safeParse({ ...base, body: [] });
    expect(result.success).toBe(false);
  });

  it('rejects malformed faqs', () => {
    const result = articleSchema.safeParse({
      ...base,
      faqs: [{ question: 'only a question' }] as never,
    });
    expect(result.success).toBe(false);
  });
});

describe('catalogSchema', () => {
  const base = {
    slug: 'wechat-account',
    type: 'PRODUCT',
    title: 'WeChat Account',
    categoryId: 'cat_1',
    status: 'DRAFT',
    description: [{ type: 'paragraph', data: { text: 'Hello' } }],
    features: [{ title: 'Feature', text: 'Works' }],
    faqs: [{ question: 'Q?', answer: 'A.' }],
  };

  it('accepts a minimal valid item', () => {
    const result = catalogSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it('accepts optional coverImageId', () => {
    const result = catalogSchema.safeParse({ ...base, coverImageId: 'media_1' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid type', () => {
    const result = catalogSchema.safeParse({ ...base, type: 'GADGET' });
    expect(result.success).toBe(false);
  });
});
