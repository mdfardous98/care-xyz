export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans">
      {/* Nav Skeleton */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="h-8 w-32 bg-stone-200 rounded-xl animate-pulse"></div>
          <div className="flex gap-8">
            <div className="h-4 w-16 bg-stone-100 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-stone-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-5xl mx-auto px-6 lg:px-8 py-16 w-full">
        {/* Header Skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-10 w-64 bg-stone-200 rounded-2xl animate-pulse"></div>
          <div className="h-4 w-96 bg-stone-100 rounded-lg animate-pulse"></div>
        </div>

        {/* List Skeleton */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-stone-100 overflow-hidden">
          <ul className="divide-y divide-stone-50">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    {/* Title & Badge */}
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-48 bg-stone-200 rounded-lg animate-pulse"></div>
                      <div className="h-6 w-20 bg-rose-50 rounded-full animate-pulse"></div>
                    </div>
                    {/* Meta lines */}
                    <div className="flex flex-wrap gap-4">
                      <div className="h-4 w-24 bg-stone-100 rounded-md animate-pulse"></div>
                      <div className="h-4 w-32 bg-stone-100 rounded-md animate-pulse"></div>
                      <div className="h-4 w-28 bg-stone-100 rounded-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Action area */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-28 bg-stone-900/5 rounded-2xl animate-pulse"></div>
                    <div className="h-12 w-12 bg-stone-200 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
