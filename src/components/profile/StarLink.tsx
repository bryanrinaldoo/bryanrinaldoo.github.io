'use client';

import { useRef } from 'react';

const STAR_COLORS = ['#8b5cf6', '#ec4899', '#fb923c', '#34d399', '#3b82f6'];

/**
 * Shoots one star streak from a point along an angle, then removes it.
 * @param options Origin point, direction in degrees, travel distance and start delay.
 */
const shootStar = (options: {
  x: number;
  y: number;
  angle: number;
  distance: number;
  delay: number;
}) => {
  const star = document.createElement('span');
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] ?? '#111111';
  Object.assign(star.style, {
    position: 'fixed',
    left: `${options.x - 70}px`,
    top: `${options.y - 1}px`,
    width: '70px',
    height: '2px',
    borderRadius: '9999px',
    background: `linear-gradient(90deg, transparent, ${color})`,
    boxShadow: `0 0 8px ${color}`,
    transformOrigin: '100% 50%',
    pointerEvents: 'none',
    zIndex: '100',
  });
  document.body.append(star);

  const animation = star.animate(
    [
      { transform: `rotate(${options.angle}deg) translateX(0) scaleX(0.2)`, opacity: 1 },
      {
        transform: `rotate(${options.angle}deg) translateX(${options.distance}px) scaleX(1)`,
        opacity: 0,
      },
    ],
    { duration: 700, delay: options.delay, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'both' },
  );
  animation.addEventListener('finish', () => {
    star.remove();
  });
};

const STREAM_INTERVAL_MS = 60;

/**
 * Renders an external link that streams stars away from the cursor while hovered and bursts them on click.
 * @param props The link target, styling and content.
 * @returns The anchor element.
 */
export function StarLink(props: { href: string; className?: string; children: React.ReactNode }) {
  const pointer = useRef({ x: 0, y: 0, angle: 0 });
  const stream = useRef<number | null>(null);

  const track = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Direction runs from the button center through the cursor, so stars fly away from it
    const angle = Math.atan2(
      event.clientY - (rect.top + rect.height / 2),
      event.clientX - (rect.left + rect.width / 2),
    );
    pointer.current = { x: event.clientX, y: event.clientY, angle: (angle * 180) / Math.PI };
  };

  const stopStream = () => {
    window.clearInterval(stream.current ?? undefined);
    stream.current = null;
  };

  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer noopener"
      className={props.className}
      onPointerEnter={(event) => {
        track(event);
        stopStream();
        stream.current = window.setInterval(() => {
          shootStar({
            x: pointer.current.x,
            y: pointer.current.y,
            angle: pointer.current.angle + (Math.random() - 0.5) * 40,
            distance: 90 + Math.random() * 90,
            delay: 0,
          });
        }, STREAM_INTERVAL_MS);
      }}
      onPointerMove={track}
      onPointerLeave={stopStream}
      onClick={(event) => {
        const count = 18;
        for (let i = 0; i < count; i += 1) {
          shootStar({
            x: event.clientX,
            y: event.clientY,
            angle: (360 / count) * i + Math.random() * 12,
            distance: 140 + Math.random() * 120,
            delay: Math.random() * 120,
          });
        }
      }}
    >
      {props.children}
    </a>
  );
}
