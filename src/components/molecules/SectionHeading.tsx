import { Eyebrow } from '../atoms/Eyebrow';
type Props = { eyebrow: string; title: string; text?: string; large?: boolean };
export function SectionHeading({ eyebrow, title, text, large }: Props) {
  const Tag = large ? 'h1' : 'h2';
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag>{title}</Tag>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}
