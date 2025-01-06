import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-20 px-4 md:px-6 lg:px-8 text-center bg-gradient-to-r from-primary to-accent">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-foreground">
        Supercharge Your Social Media Insights with Ronnie
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
        Analyze. Optimize. Grow. Unlock actionable insights and strategies for
        social media success.
      </p>
      <Button size="lg" className="text-lg px-8 py-6">
        Start Free Trial
      </Button>
      <div className="mt-12">
        <Image
          fill
          src="/placeholder.svg?height=400&width=800"
          alt="Ronnie Dashboard"
          className="mx-auto rounded-lg shadow-xl w-full h-auto aspect-video"
        />
      </div>
    </header>
  );
}
