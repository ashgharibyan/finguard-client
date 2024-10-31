export default function Contact() {
  return (
    <section className="bg-gray-100 py-20 px-6" id="contact">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Reach out to us for any inquiries or support.
        </p>
        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 mb-4 border rounded"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
