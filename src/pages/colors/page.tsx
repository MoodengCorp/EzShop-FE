'use client'

export default function ColorTest() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 py-10">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">
        Color Palette & Font Preview
      </h1>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {/* softBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-softBlue" />
          <p className="mt-3 font-medium text-gray-800">softBlue</p>
          <button className="mt-2 rounded-md bg-softBlue px-4 py-2 text-white transition hover:opacity-80">
            softBlue
          </button>
        </div>

        {/* paleBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-paleBlue" />
          <p className="mt-3 font-medium text-gray-800">paleBlue</p>
          <button className="mt-2 rounded-md bg-paleBlue px-4 py-2 text-white transition hover:opacity-80">
            paleBlue
          </button>
        </div>

        {/* brightBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-brightBlue" />
          <p className="mt-3 font-medium text-gray-800">brightBlue</p>
          <button className="mt-2 rounded-md bg-brightBlue px-4 py-2 text-white transition hover:opacity-80">
            brightBlue
          </button>
        </div>

        {/* vividBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-vividBlue" />
          <p className="mt-3 font-medium text-gray-800">vividBlue</p>
          <button className="mt-2 rounded-md bg-vividBlue px-4 py-2 text-white transition hover:opacity-80">
            vividBlue
          </button>
        </div>

        {/* mainBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-mainBlue" />
          <p className="mt-3 font-medium text-gray-800">mainBlue</p>
          <button className="mt-2 rounded-md bg-mainBlue px-4 py-2 text-white transition hover:opacity-80">
            mainBlue
          </button>
        </div>

        {/* deepBlue */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="h-20 w-20 rounded-md bg-deepBlue" />
          <p className="mt-3 font-medium text-gray-800">deepBlue</p>
          <button className="mt-2 rounded-md bg-deepBlue px-4 py-2 text-white transition hover:opacity-80">
            deepBlue
          </button>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center space-y-4 text-gray-800">
        <p className="text-extraSmall font-DEFAULT">
          Extra Small Size (2.5rem)
        </p>
        <p className="text-small font-DEFAULT">Small Size (3rem)</p>
        <p className="text-main font-bold">Main Size Bold (4.2rem)</p>
        <p className="text-subTitle font-DEFAULT">Subtitle Size (4rem)</p>
        <p className="text-title font-bold">Title Size Bold (4.8rem)</p>
      </div>
    </div>
  )
}
