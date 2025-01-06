import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Zap, TrendingUp, Smile } from "lucide-react";

const features = [
  {
    title: "Smart Post Analysis",
    description:
      "Discover the hidden trends and patterns driving your engagement.",
    icon: BarChart3,
  },
  {
    title: "Actionable Insights",
    description: "Turn data into growth strategies.",
    icon: Zap,
  },
  {
    title: "Growth Tips",
    description: "Custom recommendations tailored for your goals.",
    icon: TrendingUp,
  },
  {
    title: "Easy-to-Use Interface",
    description: "No tech skills? No problem!",
    icon: Smile,
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Ronnie is the Perfect Tool for Social Media Growth
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
