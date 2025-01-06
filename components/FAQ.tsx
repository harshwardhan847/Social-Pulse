import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Ronnie analyze social media data?",
    answer:
      "Ronnie uses advanced AI algorithms to analyze your social media metrics, identifying patterns and trends that drive engagement and growth.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All data is encrypted and stored securely. We never share your information with third parties.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "You can cancel your subscription at any time with no questions asked.",
  },
  {
    question: "What platforms does Ronnie support?",
    answer:
      "Ronnie works seamlessly with Instagram, Facebook, Twitter, and LinkedIn.",
  },
  {
    question: "Can I export my insights?",
    answer:
      "Yes, you can download detailed reports for offline use or sharing.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Got Questions? We&apos;ve Got Answers!
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
