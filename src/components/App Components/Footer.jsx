import {Link} from "react-router"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#374151] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Saylani Microfinance</h3>
            <p className="mb-4">Empowering communities through microfinance and education.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary transition-colors">
                  Apply for a Loan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-2">A-25, Bahadurabad Chowrangi, Karachi, Pakistan</p>
            <p className="mb-2">Phone: +92 111 729 5264</p>
            <p>Email: info@saylaniwelfare.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Saylani Microfinance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

