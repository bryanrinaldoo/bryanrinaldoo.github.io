'use client';

/**
 * Renders a card whose soft light follows the cursor.
 * @param props Styling and content.
 * @returns The card element.
 */
export function SpotlightCard(props: { className?: string; children: React.ReactNode }) {
  return (
    <article
      className={`bg-[radial-gradient(480px_circle_at_var(--x,30%)_var(--y,20%),rgba(255,255,255,0.10),transparent_45%)] ${props.className ?? ''}`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
      }}
    >
      {props.children}
    </article>
  );
}
