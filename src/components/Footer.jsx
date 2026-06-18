export default function Footer() {
  return (
    <footer className="w-full px-6 py-6 bg-amber-50 md:px-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[12px] font-medium uppercase tracking-[0.15em] text-slate-500">
        <span>© 2024 ShortLink. The Digital Architect.</span>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <button className="hover:text-slate-700 transition">
            Privacy Policy
          </button>

          <button className="hover:text-slate-700 transition">
            Terms of Service
          </button>

          <button className="hover:text-slate-700 transition">
            API Documentation
          </button>

          <button className="hover:text-slate-700 transition">
            Support
          </button>
        </div>
      </div>
    </footer>
  );
}
