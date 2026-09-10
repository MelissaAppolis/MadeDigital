import { useCallback, useState } from 'react'

const encode = (data) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k] ?? '')}`)
    .join('&')

/**
 * Submits a form to Netlify Forms.
 *
 * Netlify picks the form up from the matching hidden <form> in index.html, so
 * the only contract is that `formName` and the field names line up with it.
 *
 * To move to a different provider (Formspree, Basin, a serverless function),
 * replace the fetch below — nothing in the pages needs to change.
 *
 * @param {string} formName  Must match a form declared in index.html.
 * @param {(values: object) => object} validate  Returns { field: message }.
 */
export function useFormSubmit(formName, validate) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const submit = useCallback(
    async (event) => {
      event.preventDefault()
      const form = event.target
      const values = Object.fromEntries(new FormData(form).entries())

      // Honeypot: a real person never fills this in.
      if (values['bot-field']) {
        setStatus('success')
        return
      }

      const found = validate ? validate(values) : {}
      setErrors(found)

      if (Object.keys(found).length > 0) {
        setStatus('invalid')
        const firstField = Object.keys(found)[0]
        form.querySelector(`[name="${firstField}"]`)?.focus()
        return
      }

      setStatus('submitting')

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({ 'form-name': formName, ...values }),
        })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        setStatus('success')
        form.reset()
      } catch (error) {
        // The Netlify form endpoint only exists on a deployed site. Locally we
        // log the payload and show the success state so the flow is testable.
        if (import.meta.env.DEV) {
          console.info(
            `[dev] "${formName}" would submit:`,
            values,
            '\nForms post for real once deployed to Netlify.'
          )
          setStatus('success')
          form.reset()
          return
        }
        console.error(error)
        setStatus('error')
      }
    },
    [formName, validate]
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setErrors({})
  }, [])

  return { status, errors, submit, reset }
}

/* ---- Shared field validators -------------------------------------------- */

export const required = (value) => (value && value.trim() ? null : 'Required')

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value || '').trim())
    ? null
    : 'Enter a valid email address'
