import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Digital Marketer",
    content: "Ronnie helped me grow my engagement by 45% in just two weeks!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "John D.",
    role: "Content Creator",
    content:
      "The detailed insights Ronnie provides are invaluable for my social media growth.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Trusted by Social Media Managers and Influencers Worldwide!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-md">
            <p className="mb-4">&ldquo;{testimonial.content}&rdquo;</p>
            <div className="flex items-center">
              <Avatar className="mr-3">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-2xl font-bold">100,000+ Posts Analyzed</p>
        <p className="text-xl">
          Helping creators achieve an average of 30% engagement growth
        </p>
      </div>
    </section>
  );
}
