import React from 'react';
import { Mail, ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';
import { getCloudinaryUrl } from '../utils/cloudinary';

const logo = getCloudinaryUrl('logo');

const Footer = ({ isDarkMode, simplified = false }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Marketplace",
      links: [
        { name: "All Products", href: "/department/All Products" },
        { name: "Fresh Produce", href: "/department/Organic %26 Sustainable Farming" },
        { name: "Farm Machinery", href: "/department/Farm Machinery %26 Tools" },
        { name: "Organic Seeds", href: "/department/Seeds %26 Plants" },
        { name: "Verified Merchants", href: "/account" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Farmer Success", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Precision Insights", href: "#" },
        { name: "Discussion Hub", href: "#" },
        { name: "Agrinex Events", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Our Story", href: "/our-story" },
        { name: "Agri-Tech Journal", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Merchant Partnerships", href: "#" },
        { name: "Support Center", href: "#" },
        { name: "Careers", href: "#" }
      ]
    }
  ];

  return (
    <footer className={`relative overflow-hidden transition-colors duration-1000 ${simplified ? 'pt-24 pb-8' : 'pt-16 pb-6'
      } ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-[#1A0F05] text-white'
      }`}>
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF9933]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 ${simplified ? 'mb-12' : 'mb-24'}`}>

          {/* Brand & Newsletter Section */}
          <div className={`${simplified ? 'lg:col-span-12 items-center text-center' : 'lg:col-span-5'} flex flex-col`}>
            <Link to="/" className={`flex items-center gap-4 mb-8 group ${simplified ? 'justify-center' : ''}`}>
              <img
                src={logo}
                alt="Agrinex Logo"
                className="h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              />
              <span className="font-yatra text-4xl tracking-tight text-white">
                Agri<span className="text-[#FF9933]">nex</span>
              </span>
            </Link>

            <p className={`text-white/50 font-hind text-lg leading-relaxed max-w-sm mb-10 ${simplified ? 'mx-auto' : ''}`}>
              Pioneering the future of agricultural commerce through precision technology and verified community trust.
            </p>

            {!simplified && (
              <div className={`relative max-w-sm group ${simplified ? 'mx-auto' : ''}`}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF9933] to-[#FF9933]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-1000"></div>
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-[#FF9933]/50 transition-all duration-500">
                  <input
                    type="email"
                    placeholder="Join the newsletter"
                    className="bg-transparent border-none outline-none flex-1 px-4 text-sm font-hind placeholder:text-white/30"
                  />
                  <button className="bg-[#FF9933] text-[#1A0F05] p-3 rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links (Hidden in simplified mode) */}
          {!simplified && (
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF9933] mb-8">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-white/40 hover:text-white transition-colors duration-300 font-hind text-sm tracking-wide flex items-center group"
                        >
                          <span className="w-0 group-hover:w-3 h-[1px] bg-[#FF9933] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 text-center md:text-left">
            <span>© {currentYear} Agrinex Marketplace</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#FF9933]/20" />
            <Link to="/privacy" className="hover:text-[#FF9933] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FF9933] transition-colors">Terms of Service</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { icon: <FaTwitter size={18} />, href: "#" },
              { icon: <FaInstagram size={18} />, href: "#" },
              { icon: <FaLinkedinIn size={18} />, href: "#" },
              { icon: <FaGithub size={18} />, href: "#" },
              { icon: <FaFacebookF size={18} />, href: "#" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-white/20 hover:text-[#FF9933] hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[20rem] font-yatra leading-none">AGRINEX</h2>
      </div>
    </footer>
  );
};

export default Footer;
