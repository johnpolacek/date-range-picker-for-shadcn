import React, { useEffect, useRef } from 'react'

interface DateInputProps {
  value?: Date
  onChange: (date: Date) => void
}

interface DateParts {
  day: number
  month: number
  year: number
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [date, setDate] = React.useState<DateParts>(() => {
    const d = value ? new Date(value) : new Date()
    return {
      day: d.getDate(),
      month: d.getMonth() + 1, // JavaScript months are 0-indexed
      year: d.getFullYear()
    }
  })

  const monthRef = useRef<HTMLInputElement | null>(null)
  const dayRef = useRef<HTMLInputElement | null>(null)
  const yearRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const d = value ? new Date(value) : new Date()
    setDate({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    })
  }, [value])

  const handleInputChange =
    (field: keyof DateParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let isValid = true
      const newValue = e.target.value ? Number(e.target.value) : ''

      // Perform validity checks based on the field
      if (
        (field === 'day' && (newValue < 1 || newValue > 31)) ||
        (field === 'month' && (newValue < 1 || newValue > 12)) ||
        (field === 'year' && (newValue < 1000 || newValue > 9999))
      ) {
        isValid = false
      }

      // If the new value is valid, update the date
      const newDate = { ...date, [field]: newValue }

      // Validate the day of the month
      const d = new Date(newDate.year, newDate.month - 1, newDate.day)
      if (
        d.getFullYear() !== newDate.year ||
        d.getMonth() + 1 !== newDate.month ||
        d.getDate() !== newDate.day
      ) {
        isValid = false
      }

      setDate(newDate)

      // only call onChange when the entry is valid
      if (isValid) {
        onChange(d)
      }
    }

  const handleKeyDown =
    (field: keyof DateParts) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        let newDate = { ...date }

        if (field === 'day') {
          if (date[field] === new Date(date.year, date.month, 0).getDate()) {
            newDate = { ...newDate, day: 1, month: (date.month % 12) + 1 }
            if (newDate.month === 1) newDate.year += 1
          } else {
            newDate.day += 1
          }
        }

        if (field === 'month') {
          if (date[field] === 12) {
            newDate = { ...newDate, month: 1, year: date.year + 1 }
          } else {
            newDate.month += 1
          }
        }

        if (field === 'year') {
          newDate.year += 1
        }

        setDate(newDate)
        onChange(new Date(newDate.year, newDate.month - 1, newDate.day))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        let newDate = { ...date }

        if (field === 'day') {
          if (date[field] === 1) {
            newDate.month -= 1
            if (newDate.month === 0) {
              newDate.month = 12
              newDate.year -= 1
            }
            newDate.day = new Date(newDate.year, newDate.month, 0).getDate()
          } else {
            newDate.day -= 1
          }
        }

        if (field === 'month') {
          if (date[field] === 1) {
            newDate = { ...newDate, month: 12, year: date.year - 1 }
          } else {
            newDate.month -= 1
          }
        }

        if (field === 'year') {
          newDate.year -= 1
        }

        setDate(newDate)
        onChange(new Date(newDate.year, newDate.month - 1, newDate.day))
      }

      if (e.key === 'ArrowRight') {
        if (
          e.currentTarget.selectionStart === e.currentTarget.value.length ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault()
          if (field === 'month') dayRef.current?.focus()
          if (field === 'day') yearRef.current?.focus()
        }
      } else if (e.key === 'ArrowLeft') {
        if (
          e.currentTarget.selectionStart === 0 ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault()
          if (field === 'day') monthRef.current?.focus()
          if (field === 'year') dayRef.current?.focus()
        }
      }
    }

  return (
    <div className="flex border rounded-lg items-center text-sm px-1">
      <input
        type="text"
        ref={monthRef}
        max={12}
        maxLength={2}
        value={date.month.toString()}
        onChange={handleInputChange('month')}
        onKeyDown={handleKeyDown('month')}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="M"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={dayRef}
        max={31}
        maxLength={2}
        value={date.day.toString()}
        onChange={handleInputChange('day')}
        onKeyDown={handleKeyDown('day')}
        className="p-0 outline-none w-7 border-none text-center"
        placeholder="D"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={yearRef}
        max={9999}
        maxLength={4}
        value={date.year.toString()}
        onChange={handleInputChange('year')}
        onKeyDown={handleKeyDown('year')}
        className="p-0 outline-none w-12 border-none text-center"
        placeholder="YYYY"
      />
    </div>
  )
}

DateInput.displayName = 'DateInput'

export { DateInput }
