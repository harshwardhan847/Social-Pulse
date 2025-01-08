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
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

function App() {
  const { openSignIn } = useClerk();
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen  dark:bg-black bg-transparent  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <MovingBlobs />
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {isMobile ? (
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
                    Supercharge Your Social Media Insights with Social Pulse
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
      ) : (
        <>
          <div className="flex items-center justify-end bg-gradient-to-b from-white/50 via-white/20 to-transparent fixed top-0 left-0 right-0 z-50">
            <AnimatedButton
              size="lg"
              className="border m-4 border-primary text-primary hover:text-white bg-transparent"
              variant={"default"}
              onClick={() => openSignIn()}
            >
              Sign In
            </AnimatedButton>
          </div>
          <ContainerScroll
            titleComponent={
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Social Media Insights
                  <br /> with
                  <br />
                  <p className="md:text-9xl">Social Pulse</p>
                </h1>
              </motion.div>
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <Image
                fill
                src="/home.png"
                alt="Dashboard Preview"
                className="relative rounded-2xl shadow-2xl border object-cover"
              />
            </motion.div>
          </ContainerScroll>
          <div className="flex gap-4 w-full items-center justify-center -translate-y-32">
            <AnimatedButton
              size="lg"
              className="text-4xl py-8"
              onClick={() => openSignIn()}
            >
              Start Free Trial
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              className="text-4xl py-8"
              variant="outline"
            >
              Watch Demo
            </AnimatedButton>
          </div>
        </>
      )}

      {/* Header Section */}

      <CaseStudies />

      <CustomerSuccess />

      <InteractiveDemo />

      <Footer />
    </div>
  );
}

export default App;
