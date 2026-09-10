import { useId } from 'react'

/**
 * One labelled form control. Renders an input, textarea or select depending on
 * `as`, and wires up the error message with aria-describedby.
 */
export default function Field({
  as = 'input',
  name,
  label,
  hint,
  error,
  required: isRequired = false,
  options,
  className = '',
  ...rest
}) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined

  const shared = {
    id,
    name,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
    required: isRequired || undefined,
    ...rest,
  }

  return (
    <div className={`field${className ? ` ${className}` : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {isRequired && (
          <span className="field__req" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {!isRequired && <span className="field__hint"> (optional)</span>}
      </label>

      {hint && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}

      {as === 'textarea' && <textarea className="textarea" {...shared} />}

      {as === 'select' && (
        <select className="select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === 'input' && <input className="input" {...shared} />}

      {error && (
        <p className="field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/** A radio group rendered as selectable cards. */
export function ChoiceGroup({
  legend,
  name,
  options,
  error,
  columns = 2,
  defaultValue,
}) {
  return (
    <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="field__label" style={{ padding: 0, marginBottom: '0.5rem' }}>
        {legend}
      </legend>
      <div className={`choices${columns === 2 ? ' choices--2' : ''}`}>
        {options.map((option) => (
          <label className="choice" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
            />
            <span className="choice__mark" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="field__error">{error}</p>}
    </fieldset>
  )
}
