"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeIn } from "@/components/animations/FadeIn";

const demoSteps = [
  {
    title: "Connect Your Accounts",
    description: "Link your social media profiles in one click",
  },
  {
    title: "Import Your Data",
    description: "We'll analyze your existing content performance",
  },
  {
    title: "Get Insights",
    description: "Receive personalized recommendations",
  },
];

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / demoSteps.length) * 100;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-blue-50 to-red-50 opacity-50" />
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            Try Ronnie in Action
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <Progress value={progress} className="mb-8" />

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-2">
                {demoSteps[currentStep].title}
              </h3>
              <p className="text-muted-foreground">
                {demoSteps[currentStep].description}
              </p>
            </motion.div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setCurrentStep(
                    Math.min(demoSteps.length - 1, currentStep + 1)
                  )
                }
                disabled={currentStep === demoSteps.length - 1}
              >
                Next Step
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
