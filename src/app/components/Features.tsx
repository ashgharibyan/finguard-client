export default function Features() {
  return (
    <section className="container mx-auto py-20 px-6" id="features">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Track Expenses
          </h3>
          <p className="text-gray-700">
            Monitor your spending and make informed decisions with real-time
            expense tracking.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Detailed Analytics
          </h3>
          <p className="text-gray-700">
            Get insights into your spending habits with beautiful charts and
            reports.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4 text-black">Secure Data</h3>
          <p className="text-gray-700">
            Your financial data is encrypted and securely stored with FinGuard.
          </p>
        </div>
      </div>
    </section>
  );
}
