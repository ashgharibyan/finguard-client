export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">FinGuard</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#features" className="hover:text-gray-300">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300">
              Log In
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
