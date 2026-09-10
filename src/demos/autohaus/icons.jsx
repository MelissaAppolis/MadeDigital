/**
 * Icons for the AutoHaus Cape Town concept.
 *
 * One hairline stroke set on a 24px grid, drawn at a single weight so the
 * service directory reads as one instrument rather than ten illustrations.
 * These are interface marks — every other image on this concept is a
 * photograph.
 */

const Line = ({ size = 22, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
)

/** Service & maintenance — a spanner. */
export const ServiceIcon = (props) => (
  <Line {...props}>
    <path d="M15.5 4.5a4.5 4.5 0 0 0-5.9 5.6L4 15.7a1.8 1.8 0 0 0 2.5 2.5l5.6-5.6a4.5 4.5 0 0 0 5.6-5.9l-2.4 2.4-2.5-.6-.6-2.5 2.4-2.4Z" />
    <path d="M6 17.4h.01" />
  </Line>
)

/** Diagnostics — a handheld reader with a trace on its screen. */
export const DiagnosticsIcon = (props) => (
  <Line {...props}>
    <rect x="4" y="3" width="16" height="14" rx="1.5" />
    <path d="M7 11.5h2l1.5-3 2 5 1.5-2.5h3" />
    <path d="M9.5 21h5" />
    <path d="M12 17v4" />
  </Line>
)

/** Brakes — a vented disc and caliper. */
export const BrakesIcon = (props) => (
  <Line {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 4.2v2.4M12 17.4v2.4M4.2 12h2.4M17.4 12h2.4" />
    <path d="M17.5 6.5 20 4" />
  </Line>
)

/** Battery & electrical. */
export const BatteryIcon = (props) => (
  <Line {...props}>
    <rect x="2.5" y="7.5" width="17" height="10" rx="1.5" />
    <path d="M19.5 11v3H21a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-1.5Z" />
    <path d="M6 7.5V6h3v1.5M13 7.5V6h3v1.5" />
    <path d="M7 12.5h3M8.5 11v3M14 12.5h3" />
  </Line>
)

/** Air conditioning — a fan and a cool mark. */
export const AirconIcon = (props) => (
  <Line {...props}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5 4.2 16.5" />
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 3.2 10.6 5M12 3.2 13.4 5M12 20.8 10.6 19M12 20.8l1.4-1.8" />
  </Line>
)

/** Suspension — a coil spring between mounts. */
export const SuspensionIcon = (props) => (
  <Line {...props}>
    <path d="M6.5 3.5h11M6.5 20.5h11" />
    <path d="M12 3.5v2M12 18.5v2" />
    <path d="M7.5 6.5h9l-9 3h9l-9 3h9l-9 3h9" />
  </Line>
)

/** Wheel alignment — a wheel between measurement marks. */
export const AlignmentIcon = (props) => (
  <Line {...props}>
    <rect x="8" y="4" width="8" height="16" rx="2.5" />
    <path d="M12 8.5v7" />
    <path d="M3.5 5v14M20.5 5v14" />
    <path d="M3.5 12h2.5M18 12h2.5" />
  </Line>
)

/** Pre-purchase inspection — a checked clipboard. */
export const InspectionIcon = (props) => (
  <Line {...props}>
    <path d="M8.5 4.5H6.5a1.5 1.5 0 0 0-1.5 1.5v13a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5h-2" />
    <rect x="8.5" y="2.5" width="7" height="4" rx="1" />
    <path d="m8.8 13.5 2 2 4.4-4.4" />
  </Line>
)

/** Engine repairs — a block with its cam cover and pulley. */
export const EngineIcon = (props) => (
  <Line {...props}>
    <path d="M4 11.5h2.5l2-3h5l2 3H18a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" />
    <path d="M9 8.5V6h5" />
    <path d="M20 13h1.5v3H20" />
    <path d="M4 14H2" />
  </Line>
)

/** Tyres & wheel services — a tread band around a rim. The tread ticks are
    what keep this from reading as the brake disc three rows above it. */
export const TyresIcon = (props) => (
  <Line {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5.5" />
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    <path d="m6 6 2.1 2.1M15.9 15.9 18 18M18 6l-2.1 2.1M8.1 15.9 6 18" />
  </Line>
)

export const CheckIcon = ({ size = 16, ...rest }) => (
  <Line size={size} strokeWidth="1.6" {...rest}>
    <path d="m4.5 12.5 4.5 4.5L19.5 7" />
  </Line>
)

export const ArrowIcon = ({ size = 18, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </Line>
)

export const PhoneIcon = ({ size = 16, ...rest }) => (
  <Line size={size} {...rest}>
    <path d="M8.4 3.5H5.6A1.6 1.6 0 0 0 4 5.2c0 8.2 6.6 14.8 14.8 14.8a1.6 1.6 0 0 0 1.7-1.6v-2.8l-4-1.6-2 2a12.4 12.4 0 0 1-5.3-5.3l2-2-2.8-4Z" />
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

/** Maps a service id to its mark, so content.js stays icon-free. */
export const serviceIcons = {
  service: ServiceIcon,
  diagnostics: DiagnosticsIcon,
  brakes: BrakesIcon,
  battery: BatteryIcon,
  aircon: AirconIcon,
  suspension: SuspensionIcon,
  engine: EngineIcon,
  tyres: TyresIcon,
  alignment: AlignmentIcon,
  inspection: InspectionIcon,
}
