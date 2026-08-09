import type { ContentBlock } from '@/lib/content-blocks';

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-ink-600">
                {block.data.text}
              </p>
            );
          case 'heading':
            const Tag = `h${block.data.level}` as 'h2' | 'h3' | 'h4';
            return (
              <Tag key={index} className="pt-4 text-xl font-bold tracking-tight text-ink-900">
                {block.data.text}
              </Tag>
            );
          case 'list':
            return (
              <ul key={index} className="list-inside list-disc space-y-2 text-ink-600">
                {block.data.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <div key={index} className="rounded-lg border border-brand-200 bg-brand-50 p-5">
                <p className="font-semibold text-brand-900">{block.data.title}</p>
                <p className="mt-1 text-sm text-brand-800">{block.data.text}</p>
              </div>
            );
          default:
            return (
              <p key={index} className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-500">
                Unsupported content block
              </p>
            );
        }
      })}
    </div>
  );
}
