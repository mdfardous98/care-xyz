import Link from "next/link";
import {
  Facebook,
  Youtube,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://www.facebook.com/tajwar.fardous",
      color: "hover:text-blue-500",
    },
    {
      Icon: Github,
      href: "https://github.com/mdfardous98",
      color: "hover:text-white",
    },
    {
      Icon: Youtube,
      href: "https://youtube.com/@yourusername",
      color: "hover:text-red-500",
    },
    {
      Icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <footer className="bg-[#0c0a09] text-stone-400 font-sans border-t border-stone-900">
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-stone-800 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Care<span className="text-rose-500">.</span>xyz
              </span>
            </Link>
            <p className="text-stone-500 leading-relaxed text-sm">
              Elite caregiving services for families who demand excellence.
              Verified professionals, compassionate hearts, and 24/7
              reliability.
            </p>
            <div className="flex gap-5">
              {socialLinks.map(({ Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-300 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">
              Specialized Care
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                "Infant Care",
                "Geriatric Support",
                "Post-Op Recovery",
                "Physical Therapy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="hover:text-rose-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">
              Resources
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                "Our Standards",
                "Pricing Plans",
                "Become a Caregiver",
                "Partner Program",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-rose-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8">
              Headquarters
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-stone-300 leading-tight">
                  Jatrabari, Dhaka-1362,
                  <br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-rose-500 shrink-0" />
                <a
                  href="tel:+8801688645882"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  +880 1688 645 882
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-rose-500 shrink-0" />
                <a
                  href="mailto:mdjfardous@gmail.com"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  mdjfardous@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-stone-600">
          <p>
            © {new Date().getFullYear()} Care.xyz — Engineered for Excellence.
          </p>
          <div className="flex gap-10">
            <Link
              href="/privacy"
              className="hover:text-stone-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-stone-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
