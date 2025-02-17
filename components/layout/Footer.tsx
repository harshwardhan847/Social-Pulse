import { Github, Linkedin, Youtube } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 mt-24 border-t backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Social Pulse</h3>
              <p className="text-muted-foreground">
                Your intelligent social media performance partner.
              </p>
            </div>

            {/* <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div> */}

            <div className="w-full col-span-3 place-items-end">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://youtu.be/gHG5w1mZ8xU?si=Z5mDX_lWVnfYyqSx"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/harshwardhan847"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/harshwardhan847"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {currentYear} Social Pulse. All rights reserved.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
