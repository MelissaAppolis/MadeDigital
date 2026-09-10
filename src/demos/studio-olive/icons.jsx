/**
 * Icons for the Studio Olive concept.
 *
 * Deliberately few. The brand's mark is the olive sprig; everything else is a
 * thin 1px line glyph so nothing competes with the typography.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, size = 20, viewBox = '0 0 24 24', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/**
 * The brand mark: a small olive sprig. Used beside the logo, as a section
 * divider and in the success panel.
 */
export const Sprig = ({ size = 44, className, ...rest }) => (
  <svg
    width={size}
    height={size * 0.42}
    viewBox="0 0 100 42"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...rest}
  >
    <path
      d="M2 38C22 34 46 26 66 12c8-6 18-9 32-10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {[
      [16, 32, -32],
      [28, 28, 26],
      [40, 24, -30],
      [52, 19, 24],
      [64, 14, -28],
      [78, 8, 22],
    ].map(([x, y, r], i) => (
      <ellipse
        key={i}
        cx={x}
        cy={y}
        rx="9"
        ry="3.4"
        fill="currentColor"
        transform={`rotate(${r} ${x} ${y})`}
      />
    ))}
    <circle cx="46" cy="27" r="3.1" fill="currentColor" />
    <circle cx="70" cy="15" r="3.1" fill="currentColor" />
  </svg>
)

export const WhatsAppIcon = ({ size = 18, ...rest }) => (
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

export const PhoneIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <path
      {...stroke}
      d="M6.4 3.5h2.9l1.45 3.63-1.81 1.09a11.1 11.1 0 0 0 5.34 5.34l1.09-1.81L19 13.2v2.9a2.4 2.4 0 0 1-2.61 2.4A16.6 16.6 0 0 1 4 6.11 2.4 2.4 0 0 1 6.4 3.5Z"
    />
  </Svg>
)

export const MailIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <rect {...stroke} x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
    <path {...stroke} d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
)

export const PinIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <path {...stroke} d="M12 21.5s7-5.65 7-11a7 7 0 1 0-14 0c0 5.35 7 11 7 11Z" />
    <circle {...stroke} cx="12" cy="10.25" r="2.5" />
  </Svg>
)

export const ClockIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <circle {...stroke} cx="12" cy="12" r="8.75" />
    <path {...stroke} d="M12 6.75V12l3.5 2" />
  </Svg>
)

export const InstagramIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <rect {...stroke} x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
    <circle {...stroke} cx="12" cy="12" r="4" />
    <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
  </Svg>
)

export const CloseIcon = ({ size = 18, ...rest }) => (
  <Svg size={size} {...rest}>
    <path {...stroke} d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Svg>
)
