/**
 * Site-wide details. The contact block below is live — it appears on the
 * contact page and in the footer. The hasReal* flags are derived from it, so
 * reverting a value to PLACEHOLDER brings the 'replace this' markers back.
 */

export const site = {
  name: 'Made Digital',
  tagline: 'Websites that bring you business.',
  description:
    'Made Digital creates modern, high-converting websites for small and growing businesses in Cape Town, South Africa.',
  url: 'https://madedigital.netlify.app',
  location: 'Cape Town, South Africa',
  founder: 'Melissa Appolis',

  // ---- Live contact details ----------------------------------------------
  email: 'madedigital101@gmail.com',
  // Digits only, international format, no "+" — used to build the wa.me link.
  whatsappNumber: '27716140682',
  // What is shown to a visitor, e.g. '+27 XX XXX XXXX'
  whatsappDisplay: '+27 71 614 0682',
  phoneDisplay: '+27 71 614 0682',
  // ------------------------------------------------------------------------

}

/** True once the placeholders above have actually been replaced. */
export const hasRealContact = !site.email.startsWith('PLACEHOLDER')
export const hasRealWhatsapp = site.whatsappNumber !== 'PLACEHOLDER'

export const whatsappLink = hasRealWhatsapp
  ? `https://wa.me/${site.whatsappNumber}`
  : null

export const nav = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
]

export const footerNav = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Website Review', to: '/website-review' },
  { label: 'Contact', to: '/contact' },
]
