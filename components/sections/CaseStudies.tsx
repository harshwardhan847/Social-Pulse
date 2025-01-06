import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';

const caseStudies = [
  {
    company: "GrowthCo",
    before: "2K followers, 1% engagement",
    after: "50K followers, 5% engagement",
    icon: Users,
    color: "text-blue-500",
  },
  {
    company: "TechStart",
    before: "5% conversion rate",
    after: "25% conversion rate",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    company: "MediaPro",
    before: "100 leads/month",
    after: "1000 leads/month",
    icon: BarChart,
    color: "text-purple-500",
  },
];

export function CaseStudies() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-blue-50 to-yellow-50 opacity-50" />
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            Real-World Success Stories
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <FadeIn key={study.company} delay={index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="p-6 relative overflow-hidden">
                  <study.icon className={`w-12 h-12 ${study.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-4">{study.company}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Before</p>
                      <p className="font-medium">{study.before}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">After</p>
                      <p className="font-medium text-primary">{study.after}</p>
                    </div>
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