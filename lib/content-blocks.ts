export type ContentBlock =
  | { type: 'paragraph'; data: { text: string } }
  | { type: 'heading'; data: { level: 2 | 3 | 4; text: string } }
  | { type: 'list'; data: { ordered: boolean; items: string[] } }
  | { type: 'callout'; data: { title: string; text: string } };

export type ProductFeature = {
  title: string;
  text: string;
  icon?: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export function isContentBlock(value: unknown): value is ContentBlock {
  if (typeof value !== 'object' || value === null) return false;
  const block = value as { type?: unknown; data?: unknown };
  if (typeof block.type !== 'string') return false;
  if (typeof block.data !== 'object' || block.data === null) return false;
  return ['paragraph', 'heading', 'list', 'callout'].includes(block.type);
}
