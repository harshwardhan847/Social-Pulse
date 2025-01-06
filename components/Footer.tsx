import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Ronnie</h3>
          <p className="mb-4">
            Supercharge your social media insights and grow your online
            presence.
          </p>
          <Button size="lg">Start Your Free Trial Today</Button>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2023 Ronnie. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-primary">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
