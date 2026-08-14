export type ContentBlock =
  | { type: 'paragraph'; data: { text: string } }
  | { type: 'heading'; data: { level: 2 | 3 | 4; text: string } }
  | { type: 'list'; data: { ordered: boolean; items: string[] } }
  | { type: 'callout'; data: { title: string; text: string } }
  | { type: 'links'; data: { title: string; items: Array<{ label: string; href: string }> } }
  | { type: 'table'; data: { headers: string[]; rows: string[][] } };

export type ProductFeature = {
  title: string;
  text: string;
  icon?: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};
