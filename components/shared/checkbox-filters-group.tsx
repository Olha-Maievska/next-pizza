import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'

type Item = FilterChecboxProps
interface Props {
  className: string
  title: string
  items: Item[]
  defaultItems: Item[]
  limit: number
  searchInputPlaceholder?: string
  defaultValue?: string[]
  onChange?: (items: string[]) => void
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  items,
  defaultItems,
  limit,
  searchInputPlaceholder,
  defaultValue,
  onChange,
}) => {
  const [showAll, setShowAll] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  const list = showAll
    ? items.filter(({ text }) =>
        text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit)

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={className}>
      <h4 className="font-bold mb-3">{title}</h4>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={handleChangeSearchInput}
            value={searchValue}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map(({ text, value, endAdornment }, i) => (
          <FilterCheckbox
            key={`${value}${i}`}
            text={text}
            value={value}
            checked={false}
            onCheckedChange={() => console.log('checked')}
            endAdornment={endAdornment}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-5' : ''}>
          <button
            className="text-primary mt-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show less' : 'Show all'}
          </button>
        </div>
      )}
    </div>
  )
}
