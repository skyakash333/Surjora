import type { ContentBlock } from '@/lib/content-blocks';
import { CheckIcon } from '@/components/ui/icons';

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="leading-relaxed text-ink-700">
                {block.data.text}
              </p>
            );
          case 'heading': {
            const Tag = `h${block.data.level}` as 'h2' | 'h3' | 'h4';
            return (
              <Tag
                key={index}
                className="pt-3 text-xl font-bold tracking-tight text-ink-900 sm:text-2xl"
              >
                {block.data.text}
              </Tag>
            );
          }
          case 'list':
            return (
              <ul key={index} className="space-y-2.5">
                {block.data.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ink-700">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <div
                key={index}
                className="rounded-2xl border border-brand-200 bg-brand-50/70 p-5 sm:p-6"
              >
                <p className="font-semibold text-brand-900">{block.data.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-800">{block.data.text}</p>
              </div>
            );
          default:
            return (
              <p
                key={index}
                className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-500"
              >
                Unsupported content block
              </p>
            );
        }
      })}
    </div>
  );
}
