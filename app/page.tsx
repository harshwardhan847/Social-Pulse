"use client";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CustomerSuccess } from "@/components/sections/CustomerSuccess";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedButton } from "@/components/ui/motion-button";
import { MovingBlobs } from "@/components/background/MovingBlobs";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useClerk } from "@clerk/nextjs";

function App() {
  const { openSignIn } = useClerk();
  return (
    <div className="min-h-screen bg-transparent backdrop-blur-3xl">
      <MovingBlobs />

      {/* Header Section */}
      <header className="relative overflow-hidden pt-16 pb-32">
        <motion.div
          animate={{
            background: [
              // "linear-gradient(45deg, rgba(255,0,0,0.1), rgba(0,0,255,0.1))",
              // "linear-gradient(45deg, rgba(0,0,255,0.1), rgba(255,255,0,0.1))",
              // "linear-gradient(45deg, rgba(255,255,0,0.1), rgba(255,0,0,0.1))",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Supercharge Your Social Media Insights with Ronnie
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Analyze. Optimize. Grow. Unlock actionable insights and
                  strategies for social media success.
                </p>
                <div className="flex gap-4">
                  <AnimatedButton size="lg" onClick={() => openSignIn()}>
                    Start Free Trial
                  </AnimatedButton>
                  <AnimatedButton size="lg" variant="outline">
                    Watch Demo
                  </AnimatedButton>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Dashboard Preview"
                  className="relative rounded-2xl shadow-2xl border"
                />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </header>

      <CaseStudies />

      <CustomerSuccess />

      <InteractiveDemo />

      <Footer />
    </div>
  );
}

export default App;
