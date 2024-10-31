export default function Hero() {
  return (
    <section className="bg-gray-100 text-center py-20 px-6" id="hero">
      <h2 className="text-4xl font-bold mb-4 text-black">
        Your Trusted Expense Tracker
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        FinGuard helps you manage your finances with ease and confidence.
      </p>
      <a
        href="#contact"
        className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Get Started
      </a>
    </section>
  );
}
