import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/FadeIn";

const successStories = [
  {
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?auto=format&fit=crop&w=100&h=100&q=80",
    quote: "Ronnie transformed our social media strategy completely.",
    stats: {
      engagement: "+150%",
      followers: "+200K",
      conversion: "+45%",
    },
  },
  {
    company: "GrowthLabs",
    logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?auto=format&fit=crop&w=100&h=100&q=80",
    quote: "The insights we get are incredible. Our ROI has never been better.",
    stats: {
      engagement: "+200%",
      followers: "+500K",
      conversion: "+60%",
    },
  },
];

export function CustomerSuccess() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 via-red-50 to-yellow-50 opacity-50" />
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            Customer Success Stories
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <FadeIn key={story.company} delay={index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={story.logo}
                      alt={story.company}
                      className="w-12 h-12 rounded-full"
                    />
                    <h3 className="text-xl font-bold">{story.company}</h3>
                  </div>
                  <p className="text-lg mb-6 italic h-[4ch]">"{story.quote}"</p>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(story.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-muted-foreground capitalize">
                          {key}
                        </p>
                        <p className="text-xl font-bold text-primary">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
