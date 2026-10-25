interface QuantityPickerProps {
    value: number
    max: number
    onChange: (value: number) => void
    disabled?: boolean
  }
  
  function QuantityPicker({ value, max, onChange, disabled = false }: QuantityPickerProps) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(value - 1)}
          disabled={disabled || value <= 1}
          className="h-9 w-9 rounded border border-gray-300 bg-white enabled:hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          disabled={disabled || value >= max}
          className="h-9 w-9 rounded border border-gray-300 bg-white enabled:hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    )
  }
  
  export default QuantityPicker