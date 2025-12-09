// Components/user/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-400">ByteFeast</h2>
          <p className="text-gray-300">
            Delicious food delivered to your doorstep. Explore a variety of meals, snacks, drinks, and desserts.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/Menu" className="hover:text-orange-400 transition">Menu</Link></li>
            <li><Link to="/orders" className="hover:text-orange-400 transition">Orders</Link></li>
            <li><Link to="/profile" className="hover:text-orange-400 transition">Profile</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-700 transition"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        © 2025 ByteFeast. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
