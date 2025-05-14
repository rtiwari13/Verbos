// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10 px-4">
//       <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
//         {/* Logo / Brand */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">MyCompany</h2>
//           <p className="text-gray-400">Innovating the digital experience.</p>
//         </div>

//         {/* Navigation Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Company</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li><a href="#" className="hover:text-white">About</a></li>
//             <li><a href="#" className="hover:text-white">Careers</a></li>
//             <li><a href="#" className="hover:text-white">Blog</a></li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Support</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li><a href="#" className="hover:text-white">Help Center</a></li>
//             <li><a href="#" className="hover:text-white">Terms of Service</a></li>
//             <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
//           <div className="flex space-x-4 text-xl">
//             <a href="#" className="hover:text-blue-400">🐦</a>
//             <a href="#" className="hover:text-pink-500">📷</a>
//             <a href="#" className="hover:text-blue-600">🔗</a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Newspaper
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        {/* SOLUTIONS */}
        <div>
          <h3 className="font-semibold mb-4">SOLUTIONS</h3>
          <ul className="space-y-2">
            <li>Why Verbos</li>
            <li>Note taking</li>
            <li>Self organization</li>
            <li>Productivity</li>
            <li>Teams</li>
            <li>Students</li>
            <li>Compare plans</li>
          </ul>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-semibold mb-4">EXPLORE</h3>
          <ul className="space-y-2">
            <li>AI features</li>
            <li>Collaboration</li>
            <li>Web Clipper</li>
            <li>Advanced search</li>
            <li>Document scanning</li>
            <li>Personalization</li>
            <li>Calendar</li>
            <li>Tasks</li>
            <li>Integrations</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-semibold mb-4">RESOURCES</h3>
          <ul className="space-y-2">
            <li>Verbos news</li>
            <li>Product Updates</li>
            <li>Help & learning</li>
            <li>Templates</li>
            <li>Forum</li>
            <li>Find an Expert</li>
            <li>Developers</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>About Verbos</li>
          </ul>
        </div>

        {/* GET STARTED + SOCIALS */}
        <div>
          <h3 className="font-semibold mb-4">GET STARTED</h3>
          <ul className="space-y-2">
            <li>Sign up for free</li>
            <li>Log in</li>
            <li>Download</li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <Facebook className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
            <Newspaper className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
