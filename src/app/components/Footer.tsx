export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} FinGuard. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
