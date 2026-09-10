/**
 * Reusable device mockups.
 *
 * Every screenshot on the site goes through one of these, so swapping a
 * placeholder for a real screenshot is only ever a change of `src`.
 */

/** A desktop browser frame. */
export function BrowserMockup({
  src,
  alt,
  url = 'example.co.za',
  tall = false,
  loading = 'lazy',
  className = '',
  width,
  height,
}) {
  return (
    <div className={`mockup${tall ? ' mockup--tall' : ''}${className ? ` ${className}` : ''}`}>
      <div className="mockup__chrome" aria-hidden="true">
        <div className="mockup__dots">
          <i />
          <i />
          <i />
        </div>
        <div className="mockup__url">{url}</div>
        <div className="mockup__chrome-spacer" />
      </div>
      <div className="mockup__screen">
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}

/** A phone frame. Sized with the --phone-w custom property. */
export function PhoneMockup({ src, alt, loading = 'lazy', className = '', style }) {
  return (
    <div className={`phone${className ? ` ${className}` : ''}`} style={style}>
      <span className="phone__notch" aria-hidden="true" />
      <div className="phone__screen">
        <img src={src} alt={alt} loading={loading} decoding="async" />
      </div>
    </div>
  )
}

/**
 * Desktop frame with a phone overlapping its lower-left corner. On narrow
 * screens the two stack instead of overlapping, so nothing is ever cropped.
 */
export function DeviceStage({
  desktop,
  mobile,
  alt,
  url,
  loading = 'lazy',
  className = '',
}) {
  return (
    <div className={`stage${className ? ` ${className}` : ''}`}>
      <BrowserMockup src={desktop} alt={alt} url={url} loading={loading} />
      {mobile && (
        <PhoneMockup
          src={mobile}
          alt={`${alt} shown on a phone`}
          loading={loading}
        />
      )}
    </div>
  )
}
