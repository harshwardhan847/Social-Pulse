import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Upload, LineChart } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your free account in seconds.",
    icon: UserPlus,
  },
  {
    title: "Upload Data",
    description: "Import your social media post metrics.",
    icon: Upload,
  },
  {
    title: "Get Insights",
    description: "Receive actionable strategies instantly.",
    icon: LineChart,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        3 Simple Steps to Master Social Media Performance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <step.icon className="w-12 h-12 text-primary mb-4" />
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
