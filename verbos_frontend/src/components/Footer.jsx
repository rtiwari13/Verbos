// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-[var(--background)] text-[var(--muted-foreground)] py-10 px-4 border-t border-[var(--border)]">
//       <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
//         {/* Logo / Brand */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">MyCompany</h2>
//           <p className="text-[var(--muted-foreground)]">Innovating the digital experience.</p>
//         </div>

//         {/* Navigation Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-[var(--primary)]">Company</h3>
//           <ul className="space-y-2 text-[var(--muted-foreground)]">
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">About</a></li>
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Careers</a></li>
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Blog</a></li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-[var(--primary)]">Support</h3>
//           <ul className="space-y-2 text-[var(--muted-foreground)]">
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Help Center</a></li>
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a></li>
//             <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a></li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-[var(--primary)]">Follow Us</h3>
//           <div className="flex space-x-4 text-xl">
//             <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">🐦</a>
//             <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">📷</a>
//             <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">🔗</a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-[var(--muted-foreground)] text-sm">
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
    <footer className="bg-[var(--background)] text-[var(--muted-foreground)] px-6 py-12 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        {/* SOLUTIONS */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--primary)]">SOLUTIONS</h3>
          <ul className="space-y-2">
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Why Verbos</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Note taking</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Self organization</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Productivity</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Teams</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Students</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Compare plans</li>
          </ul>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--primary)]">EXPLORE</h3>
          <ul className="space-y-2">
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">AI features</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Collaboration</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Web Clipper</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Advanced search</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Document scanning</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Personalization</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Calendar</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Tasks</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Integrations</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--primary)]">RESOURCES</h3>
          <ul className="space-y-2">
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Verbos news</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Product Updates</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Help & learning</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Templates</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Forum</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Find an Expert</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Developers</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Contact us</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">About Verbos</li>
          </ul>
        </div>

        {/* GET STARTED + SOCIALS */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--primary)]">GET STARTED</h3>
          <ul className="space-y-2">
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Sign up for free</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Log in</li>
            <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Download</li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <Facebook className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer" />
            <Newspaper className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer" />
            <Youtube className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}