'use client';

const DURATION_MS = 800;
const NAV_OFFSET_PX = 64;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Animates window scroll to an element with requestAnimationFrame.
 * Native smooth scrolling is skipped by browsers when the OS disables animations.
 * @param target The element to scroll to.
 */
const scrollToElement = (target: HTMLElement) => {
  const start = window.scrollY;
  const distance = target.getBoundingClientRect().top - NAV_OFFSET_PX;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / DURATION_MS, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

/**
 * Renders an in-page anchor that scrolls smoothly to its section.
 * @param props The anchor target, styling and content.
 * @returns The anchor element.
 */
export function SmoothScrollLink(props: {
  href: `#${string}`;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={props.href}
      className={props.className}
      onClick={(event) => {
        const target = document.querySelector<HTMLElement>(props.href);

        if (target) {
          event.preventDefault();
          scrollToElement(target);
          history.replaceState(null, '', props.href);
        }
      }}
    >
      {props.children}
    </a>
  );
}
