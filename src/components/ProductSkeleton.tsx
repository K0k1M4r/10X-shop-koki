function ProductSkeleton() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="h-48 bg-gray-200" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default ProductSkeleton