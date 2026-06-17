import createIcon from "../assets/images/create-icon.png";
import slugIcon from "../assets/images/slug-icon.png";
import teamIcon from "../assets/images/team-icon.png";

const features = [
  {
    icon: createIcon,
    title: "Easy Create",
    description:
      "Instantly generate high-performance short links with a single click or through our surgical API endpoints.",
    accent: "bg-blue-200",
  },
  {
    icon: slugIcon,
    title: "Custom Slugs",
    description:
      "Maintain brand authority with readable, custom link endings that resonate with your digital audience.",
    accent: "bg-blue-200",
  },
  {
    icon: teamIcon,
    title: "Team Ready",
    description:
      "Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.",
    accent: "bg-orange-200",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#f5f6f8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Architectural Features
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Built for Enterprise Precision
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon */}
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-12 w-12"
              />

              {/* Title */}
              <h3 className="mt-8 text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-8 text-gray-500">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div
                className={`mt-8 h-1 w-8 rounded-full ${feature.accent}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}