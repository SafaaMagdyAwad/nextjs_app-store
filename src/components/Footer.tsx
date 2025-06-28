export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} all rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition">home</a>
          <a href="#" className="hover:text-blue-400 transition">products</a>
          <a href="#" className="hover:text-blue-400 transition">categories</a>
        </div>
      </div>
    </footer>
  );
}
