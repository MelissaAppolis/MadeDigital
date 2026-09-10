/**
 * Inline icons for the Cape Town Plumbing Co. concept.
 *
 * Hand-drawn on a 24x24 grid with a 1.5px stroke so they sit together as one
 * set. No icon library — six service marks and a handful of UI glyphs is not
 * worth a dependency.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, size = 24, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* ---- Service marks ------------------------------------------------------ */

/** Urgent leak: a droplet carrying an alert. */
const Burst = (p) => (
  <Svg {...p}>
    <path
      {...stroke}
      d="M12 2.75c0 0-5.75 6.4-5.75 10.25a5.75 5.75 0 0 0 11.5 0C17.75 9.15 12 2.75 12 2.75Z"
    />
    <path {...stroke} d="M12 9.5v3.25" />
    <circle cx="12" cy="15.75" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
)

/** Blocked drain: a grated waste outlet. */
const Drain = (p) => (
  <Svg {...p}>
    <circle {...stroke} cx="12" cy="12" r="8.75" />
    <circle {...stroke} cx="12" cy="12" r="3" />
    <path
      {...stroke}
      d="M12 3.25V9M12 15v5.75M3.25 12H9M15 12h5.75"
    />
  </Svg>
)

/** Leak detection: a droplet under inspection. */
const Detect = (p) => (
  <Svg {...p}>
    <circle {...stroke} cx="10.5" cy="10.5" r="7.25" />
    <path {...stroke} d="m15.9 15.9 4.85 4.85" />
    <path
      {...stroke}
      d="M10.5 6.75c0 0-2.6 2.95-2.6 4.7a2.6 2.6 0 0 0 5.2 0c0-1.75-2.6-4.7-2.6-4.7Z"
    />
  </Svg>
)

/** Geyser: a wall-mounted cylinder with inlet and outlet. */
const Geyser = (p) => (
  <Svg {...p}>
    <rect {...stroke} x="5.25" y="2.75" width="13.5" height="15.5" rx="3.25" />
    <path {...stroke} d="M5.25 7.5h13.5" />
    <path {...stroke} d="M9 18.25v3M15 18.25v3" />
    <circle cx="15.25" cy="12.75" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

/** Bathroom plumbing: a mixer tap over a basin. */
const Tap = (p) => (
  <Svg {...p}>
    <path {...stroke} d="M4 20.25h16" />
    <path {...stroke} d="M8.75 20.25V9.5" />
    <path {...stroke} d="M8.75 9.5h5.5a4 4 0 0 1 4 4v1.25" />
    <path {...stroke} d="M6 6.25h5.5M8.75 6.25V9.5" />
    <path {...stroke} d="M18.25 17.5v.75" />
  </Svg>
)

/** Installations: an open-ended spanner. */
const Wrench = (p) => (
  <Svg {...p}>
    <path
      {...stroke}
      d="M15.6 3.3a5.25 5.25 0 0 0-6.15 6.9L3.6 16.05a2.2 2.2 0 0 0 3.1 3.1l5.85-5.85a5.25 5.25 0 0 0 6.9-6.15l-2.95 2.95-2.9-.6-.6-2.9 2.6-3.3Z"
    />
  </Svg>
)

export const serviceIcons = {
  burst: Burst,
  drain: Drain,
  detect: Detect,
  geyser: Geyser,
  tap: Tap,
  wrench: Wrench,
}

/* ---- UI glyphs ---------------------------------------------------------- */

export const WhatsAppIcon = ({ size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.45-1.42A10 10 0 1 0 12 2Zm0 1.85a8.15 8.15 0 1 1-4.2 15.13l-.3-.18-3.03.79.81-2.95-.2-.31A8.15 8.15 0 0 1 12 3.85Z" />
    <path d="M9.2 7.35c-.18-.42-.37-.43-.55-.44h-.47c-.16 0-.43.06-.66.3-.23.25-.86.85-.86 2.06s.88 2.39 1 2.56c.13.16 1.72 2.76 4.25 3.76 2.1.83 2.53.67 2.99.62.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.24-.16-.5-.28-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.56.12-.16.25-.64.81-.79.98-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.05-.31-.02-.44-.06-.12-.55-1.36-.77-1.86Z" />
  </svg>
)

export const PhoneIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      {...stroke}
      d="M6.4 3.5h2.9l1.45 3.63-1.81 1.09a11.1 11.1 0 0 0 5.34 5.34l1.09-1.81L19 13.2v2.9a2.4 2.4 0 0 1-2.61 2.4A16.6 16.6 0 0 1 4 6.11 2.4 2.4 0 0 1 6.4 3.5Z"
    />
  </Svg>
)

export const ArrowIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <path {...stroke} d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </Svg>
)

export const CheckIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <path {...stroke} d="m4.5 12.5 4.75 4.75L19.5 7" />
  </Svg>
)

export const MailIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <rect {...stroke} x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
    <path {...stroke} d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
)

export const ClockIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <circle {...stroke} cx="12" cy="12" r="8.75" />
    <path {...stroke} d="M12 6.75V12l3.5 2" />
  </Svg>
)

export const PinIcon = ({ size = 20, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      {...stroke}
      d="M12 21.5s7-5.65 7-11a7 7 0 1 0-14 0c0 5.35 7 11 7 11Z"
    />
    <circle {...stroke} cx="12" cy="10.25" r="2.6" />
  </Svg>
)
