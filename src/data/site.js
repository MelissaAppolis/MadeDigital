/**
 * Site-wide details. Replace the PLACEHOLDER values below with your real
 * contact details before going live — they are the only invented-looking
 * strings on the site and they appear on the contact page and in the footer.
 */

export const site = {
  name: 'Made Digital',
  tagline: 'Websites that bring you business.',
  description:
    'Made Digital creates modern, high-converting websites for small and growing businesses in Cape Town, South Africa.',
  url: 'https://madedigital.co.za',
  location: 'Cape Town, South Africa',
  founder: 'Melissa Appolis',

  // ---- REPLACE THESE -----------------------------------------------------
  email: 'PLACEHOLDER@madedigital.co.za',
  // Digits only, international format, no "+" — used to build the wa.me link.
  whatsappNumber: 'PLACEHOLDER',
  // What is shown to a visitor, e.g. '+27 XX XXX XXXX'
  whatsappDisplay: '+27 XX XXX XXXX',
  phoneDisplay: '+27 XX XXX XXXX',
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
