/**
 * Icons for the Clean & Co. concept.
 *
 * A single hairline stroke set, drawn on the same 24px grid at the same
 * weight, so the selector reads as one control rather than five illustrations.
 * These are interface marks — the concept's imagery is photographic
 * everywhere else.
 */

const Line = ({ size = 22, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
)

export const HomeIcon = (props) => (
  <Line {...props}>
    <path d="M3.5 10.5 12 4l8.5 6.5V19a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-8.5Z" />
    <path d="M9.5 20v-5.5h5V20" />
  </Line>
)

export const OfficeIcon = (props) => (
  <Line {...props}>
    <path d="M4 20V6.5a1 1 0 0 1 1-1h7v14.5" />
    <path d="M12 10h7a1 1 0 0 1 1 1v9" />
    <path d="M2.5 20h19" />
    <path d="M7 9h2M7 12.5h2M7 16h2M15.5 13.5h1M15.5 16.5h1" />
  </Line>
)

export const MoveIcon = (props) => (
  <Line {...props}>
    <path d="M3.5 8.5 12 5l8.5 3.5-8.5 3.5-8.5-3.5Z" />
    <path d="M3.5 8.5V16l8.5 3.5V12" />
    <path d="M20.5 8.5V16L12 19.5" />
  </Line>
)

export const StayIcon = (props) => (
  <Line {...props}>
    <path d="M3 18v-7.5" />
    <path d="M3 13.5h18V18" />
    <path d="M3 18h18" />
    <path d="M6.5 13.5v-2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v2" />
    <path d="M6.5 8.5h4" />
  </Line>
)

export const BuildIcon = (props) => (
  <Line {...props}>
    <path d="M14.5 4.5 19.5 9.5" />
    <path d="M13 6 4.5 14.5a1.5 1.5 0 0 0 0 2.1l2.9 2.9a1.5 1.5 0 0 0 2.1 0L18 11" />
    <path d="M9 10l5 5" />
    <path d="M17 3.5 20.5 7" />
  </Line>
)

export const CheckIcon = ({ size = 18, ...rest }) => (
  <Line size={size} strokeWidth="1.75" {...rest}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Line>
)

export const ArrowIcon = ({ size = 18, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </Line>
)

export const SparkIcon = ({ size = 18, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M12 3.5c.6 4.4 1.5 5.3 5.9 5.9-4.4.6-5.3 1.5-5.9 5.9-.6-4.4-1.5-5.3-5.9-5.9 4.4-.6 5.3-1.5 5.9-5.9Z" />
    <path d="M17.5 15.5c.3 2.2.7 2.6 2.9 2.9-2.2.3-2.6.7-2.9 2.9-.3-2.2-.7-2.6-2.9-2.9 2.2-.3 2.6-.7 2.9-2.9Z" />
  </Line>
)

/** Solid, because it carries WhatsApp's own mark. */
export const WhatsAppIcon = ({ size = 16, ...rest }) => (
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

/** Maps a selector option id to its mark, so content.js stays icon-free. */
export const selectorIcons = {
  home: HomeIcon,
  office: OfficeIcon,
  move: MoveIcon,
  airbnb: StayIcon,
  building: BuildIcon,
}
