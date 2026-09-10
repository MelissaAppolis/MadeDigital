/**
 * Icons for the Cape Build Co. concept.
 *
 * Deliberately almost none. This concept uses numerals, rules and photography
 * as its visual language, so icons only appear where a control genuinely needs
 * one — WhatsApp, and the form's success mark.
 */

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

export const CheckIcon = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m4.5 12.5 4.75 4.75L19.5 7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
    />
  </svg>
)

/** Points down to the first section — the hero's only piece of chrome. */
export const ScrollMark = ({ size = 14, ...rest }) => (
  <svg
    width={size}
    height={size * 2}
    viewBox="0 0 14 28"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M7 0v24M1 18l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    />
  </svg>
)
