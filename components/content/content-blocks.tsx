import Link from 'next/link';
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
            const ListTag = block.data.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={index}
                className={block.data.ordered ? 'list-decimal space-y-2.5 pl-6' : 'space-y-2.5'}
              >
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    className={
                      block.data.ordered
                        ? 'pl-1 text-ink-700'
                        : 'flex items-start gap-2.5 text-ink-700'
                    }
                  >
                    {!block.data.ordered && (
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                    )}
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ListTag>
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
          case 'links':
            return (
              <nav
                key={index}
                aria-label={block.data.title}
                className="rounded-2xl border border-ink-200 bg-ink-50 p-5 sm:p-6"
              >
                <p className="font-semibold text-ink-900">{block.data.title}</p>
                <ul className="mt-3 space-y-2">
                  {block.data.items.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          case 'table':
            return (
              <div key={index} className="overflow-x-auto rounded-xl border border-ink-200">
                <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                  <thead className="bg-ink-50 text-ink-900">
                    <tr>
                      {block.data.headers.map((header) => (
                        <th
                          key={header}
                          className="border-b border-ink-200 px-4 py-3 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {block.data.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {block.data.headers.map((_, columnIndex) => (
                          <td key={columnIndex} className="px-4 py-3 align-top text-ink-700">
                            {row[columnIndex] ?? ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
