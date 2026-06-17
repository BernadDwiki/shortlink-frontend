import linkIcon from "../assets/images/link-icon.png";

export default function HeroSection() {
  return (
    <section className="bg-[#f5f6f8] min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gray-900">Shorten URLs.</span>{" "}
            <span className="text-blue-600">Share Easily.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-500 text-lg">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="px-8 py-3 rounded-lg border border-gray-300 bg-white text-blue-600 font-medium hover:bg-gray-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* URL Shortener Card */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center flex-1 border border-gray-200 rounded-lg px-4">
                <img src={linkIcon} alt="Link" className="w-4 h-2 mr-3" />

                <input
                  type="text"
                  placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                  className="w-full py-3 outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Shorten
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
