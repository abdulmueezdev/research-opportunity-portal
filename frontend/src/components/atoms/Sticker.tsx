import { type SVGProps } from 'react';
import { cn } from '../../lib/utils';

export type StickerIconName =
  | 'atom'
  | 'flask'
  | 'lightbulb'
  | 'magnifier'
  | 'grad-cap'
  | 'checkmark'
  | 'exclamation'
  | 'trash'
  | 'lock'
  | 'close'
  | 'plus'
  | 'search'
  | 'calendar'
  | 'users';

export type StickerBadgeColor = 'mint' | 'ember' | 'lavender' | 'sunburst' | 'sky-wash' | 'soft-mist';

export interface StickerProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: StickerIconName;
  size?: number | string;
  badge?: boolean | StickerBadgeColor;
  rotation?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

function getBadgeColor(name: StickerIconName, badge: boolean | StickerBadgeColor): StickerBadgeColor {
  if (typeof badge === 'string') {
    return badge;
  }
  switch (name) {
    case 'checkmark':
      return 'mint';
    case 'exclamation':
    case 'trash':
      return 'ember';
    case 'lightbulb':
      return 'sunburst';
    case 'atom':
    case 'flask':
      return 'sky-wash';
    default:
      return 'lavender';
  }
}

const badgeBgMap: Record<StickerBadgeColor, string> = {
  mint: 'bg-mint text-carbon',
  ember: 'bg-ember text-paper',
  lavender: 'bg-lavender text-carbon',
  sunburst: 'bg-sunburst text-carbon',
  'sky-wash': 'bg-sky-wash text-carbon',
  'soft-mist': 'bg-soft-mist text-carbon',
};

function renderPath(name: StickerIconName) {
  switch (name) {
    case 'atom':
      return (
        <>
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.75" transform="rotate(30 12 12)" fill="none" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.75" transform="rotate(-30 12 12)" fill="none" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.75" transform="rotate(90 12 12)" fill="none" />
        </>
      );
    case 'flask':
      return (
        <>
          <path d="M9 3h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 3v4.5L4.4 17.6A2 2 0 0 0 6.1 21h11.8a2 2 0 0 0 1.7-3.4L14 7.5V3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M6.5 16h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9.5" cy="18.5" r="0.75" fill="currentColor" />
          <circle cx="13.5" cy="18" r="0.75" fill="currentColor" />
        </>
      );
    case 'lightbulb':
      return (
        <>
          <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 2a7 7 0 0 0-4.5 12.3c.6.6.9 1.4.9 2.2h7.2c0-.8.3-1.6.9-2.2A7 7 0 0 0 12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M12 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case 'magnifier':
    case 'search':
      return (
        <>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    case 'grad-cap':
      return (
        <>
          <polygon points="12 3 22 8 12 13 2 8" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="none" />
          <path d="M6 10v4.5c0 2.8 2.7 5 6 5s6-2.2 6-5V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M22 8.5v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="22" cy="15" r="1" fill="currentColor" />
        </>
      );
    case 'checkmark':
      return (
        <path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      );
    case 'exclamation':
      return (
        <>
          <path d="M12 6v7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="17.5" r="1.25" fill="currentColor" />
        </>
      );
    case 'trash':
      return (
        <>
          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M10 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M14 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case 'lock':
      return (
        <>
          <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" fill="none" />
          <path d="M7 10V6.5a5 5 0 0 1 10 0V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="15" r="1.25" fill="currentColor" />
        </>
      );
    case 'close':
      return (
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      );
    case 'plus':
      return (
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      );
    case 'calendar':
      return (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" fill="none" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case 'users':
      return (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" fill="none" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
        </>
      );
  }
}

export function Sticker({
  name,
  size = 20,
  badge = false,
  rotation,
  className,
  'aria-hidden': ariaHidden = true,
  style,
  ...props
}: StickerProps) {
  const transformStyle = rotation !== undefined
    ? {
        transform: typeof rotation === 'number' ? `rotate(${rotation}deg)` : rotation,
        ...style,
      }
    : style;

  const svgElement = (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden={ariaHidden}
      className={cn('shrink-0 select-none text-carbon', !badge && className)}
      style={badge ? undefined : transformStyle}
      {...props}
    >
      {renderPath(name)}
    </svg>
  );

  if (badge) {
    const badgeColor = getBadgeColor(name, badge);
    return (
      <span
        style={transformStyle}
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-carbon p-1.5 shrink-0 select-none',
          badgeBgMap[badgeColor],
          className
        )}
      >
        {svgElement}
      </span>
    );
  }

  return svgElement;
}
