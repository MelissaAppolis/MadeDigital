import { useId, useMemo, useState } from 'react'
import { conditionGroups, conditions } from './content.js'
import { ArrowIcon, SearchIcon } from './icons.jsx'

/**
 * The condition finder.
 *
 * A patient arrives with a word, not a category — "acne", "mole", "hair" —
 * so the section leads with a search box. Typing filters the list; the group
 * tabs narrow it further. Choosing a condition shows one note card beside the
 * list: what it is, what happens at the visit, and what usually follows.
 *
 * `onAsk(reasonId)` hands the condition's appointment reason to the page, so
 * the form below arrives preselected. The selected id always resolves to a
 * real condition: if a filter hides it, the card falls back to the first
 * match rather than reading a record that is not there.
 */
export default function ConditionFinder({ onAsk }) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All')
  const [selectedId, setSelectedId] = useState('mole-check')
  const searchId = useId()

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return conditions.filter(
      (c) =>
        (group === 'All' || c.group === group) &&
        (!q || `${c.name} ${c.summary}`.toLowerCase().includes(q))
    )
  }, [query, group])

  const selected = matches.find((c) => c.id === selectedId) || matches[0] || null

  return (
    <div className="kd-finder">
      <div className="kd-finder__controls">
        <label className="kd-finder__search" htmlFor={searchId}>
          <SearchIcon size={20} />
          <span className="kd-sr">Search conditions</span>
          <input
            id={searchId}
            type="search"
            placeholder="Search a condition, e.g. mole, acne, hair"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="kd-finder__tabs" role="group" aria-label="Filter by type">
          {conditionGroups.map((g) => (
            <button
              key={g}
              type="button"
              className="kd-finder__tab"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="kd-finder__body">
        <ul className="kd-finder__list" aria-label="Conditions">
          {matches.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="kd-finder__item"
                aria-pressed={selected?.id === c.id}
                onClick={() => setSelectedId(c.id)}
              >
                <span className="kd-finder__name">{c.name}</span>
                <span className="kd-finder__group">{c.group}</span>
              </button>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="kd-finder__empty">
              Nothing matches “{query}”. Choose <strong>Something else</strong> in
              the appointment form and tell us about it.
            </li>
          )}
        </ul>

        {selected && (
          <article className="kd-note" aria-live="polite">
            <p className="kd-eyebrow">{selected.group}</p>
            <h3>{selected.name}</h3>
            <p className="kd-note__summary">{selected.summary}</p>
            <dl className="kd-note__facts">
              <div>
                <dt>At your visit</dt>
                <dd>{selected.visit}</dd>
              </div>
              <div>
                <dt>What usually follows</dt>
                <dd>{selected.followUp}</dd>
              </div>
            </dl>
            <a
              className="kd-btn"
              href="#appointment"
              onClick={(e) => {
                e.preventDefault()
                onAsk(selected.reason)
              }}
            >
              Book about {selected.name.toLowerCase()} <ArrowIcon size={18} />
            </a>
          </article>
        )}
      </div>
    </div>
  )
}
