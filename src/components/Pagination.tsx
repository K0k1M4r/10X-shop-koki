interface PaginationProps {
    page: number
    totalPages: number
    onChange: (page: number) => void
  }
  
  function pageNumbers(page: number, total: number): (number | 'gap')[] {
    const wanted = new Set([1, total, page - 1, page, page + 1])
    const sorted = [...wanted]
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b)
  
    const result: (number | 'gap')[] = []
    sorted.forEach((p, index) => {
      if (index > 0 && p - sorted[index - 1] > 1) result.push('gap')
      result.push(p)
    })
    return result
  }
  
  const buttonClass =
    'min-w-9 rounded border border-gray-300 bg-white px-3 py-1 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-40'
  
  function Pagination({ page, totalPages, onChange }: PaginationProps) {
    if (totalPages <= 1) return null
  
    return (
      <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          className={buttonClass}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>
        {pageNumbers(page, totalPages).map((item, index) =>
          item === 'gap' ? (
            <span key={`gap-${index}`} className="px-1">
              …
            </span>
          ) : (
            <button
              key={item}
              className={
                item === page
                  ? 'min-w-9 rounded border border-blue-600 bg-blue-600 px-3 py-1 font-semibold text-white'
                  : buttonClass
              }
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ),
        )}
        <button
          className={buttonClass}
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    )
  }
  
  export default Pagination