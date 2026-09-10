/**
 * Icons for the Harbour House concept.
 *
 * A light hairline set on a 24px grid — thinner than the other concepts use,
 * because everything on this site is set light and airy and a heavier stroke
 * would sit on the page like a bruise. These are interface marks; every other
 * image on the concept is a photograph.
 */

const Line = ({ size = 20, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
)

export const ArrowIcon = ({ size = 18, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </Line>
)

export const CloseIcon = ({ size = 20, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Line>
)

export const CalendarIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3.5v3M16 3.5v3" />
  </Line>
)

export const GuestIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
  </Line>
)

export const PinIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Line>
)

export const MailIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Line>
)

export const PhoneIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M8.4 3.5H5.6A1.6 1.6 0 0 0 4 5.2c0 8.2 6.6 14.8 14.8 14.8a1.6 1.6 0 0 0 1.7-1.6v-2.8l-4-1.6-2 2a12.4 12.4 0 0 1-5.3-5.3l2-2-2.8-4Z" />
  </Line>
)

export const BedIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M3 19v-8.5h14a4 4 0 0 1 4 4V19" />
    <path d="M3 15.5h18" />
    <path d="M3 7.5v3" />
    <circle cx="7.5" cy="12" r="1.6" />
  </Line>
)

export const BathIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M3.5 12h17v2.5a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4V12Z" />
    <path d="M6 12V6.2A1.7 1.7 0 0 1 9.2 5.4" />
    <path d="M6.5 18.5 5.5 21M17.5 18.5l1 2.5" />
  </Line>
)

export const WifiIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M2.5 9a14 14 0 0 1 19 0" />
    <path d="M6 12.5a9 9 0 0 1 12 0" />
    <path d="M9.4 16a4.2 4.2 0 0 1 5.2 0" />
    <path d="M12 19.5h.01" />
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

/** Maps a room amenity to a mark where one reads clearly. */
export const amenityIcons = {
  Bed: BedIcon,
  Sleeps: GuestIcon,
  Bathroom: BathIcon,
  Outlook: PinIcon,
}
