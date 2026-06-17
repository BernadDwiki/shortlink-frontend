import analyticsImage from "../assets/images/analytics-preview.png";
import checkIcon from "../assets/images/check-icon.png";

export default function AnalyticsSection() {
  const features = [
    "Geographic Distribution Maps",
    "Device & Browser Breakdown",
    "UTM Parameter Tracking",
  ];

  return (
    <section className="bg-[#f7f8fa] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Image */}
          <div>
            <img
              src={analyticsImage}
              alt="Analytics Dashboard"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
              Data Driven Insights
            </p>

            <h2 className="mt-4 text-5xl font-bold leading-tight text-gray-900">
              Observe your link architecture in real-time.
            </h2>

            <p className="mt-6 leading-8 text-gray-500">
              Every click is a data point. Our dashboard provides
              surgical precision into where your traffic originates,
              who is engaging, and how your team communications are
              performing across the globe.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <img
                    src={checkIcon}
                    alt="Check"
                    className="h-5 w-5"
                  />

                  <span className="text-gray-800">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}