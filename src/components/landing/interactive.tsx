import { useState } from "react";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Section } from "./primitives";

const FAQS = [
  {
    q: "How are you able to completely remodel a bathroom in just 5 days?",
    a: "Our record-breaking 5-day turnaround is the result of absolute pre-construction coordination. We never swing a hammer or begin demolition until 100% of your materials are secured on site and our specialized crew is fully assigned to your home, working consecutively without outside interruptions.",
  },
  {
    q: "Who is responsible for purchasing the remodeling materials?",
    a: "We handle all logistics for structural materials (waterproofing systems, drywall, thinsets, plumbing lines). For visual finish selections (tiles, flooring, plumbing fixtures, vanities, lighting), we provide specialized design guidance and introduce you directly to our wholesale distributor network.",
  },
  {
    q: "What makes My Team Renovation different from a large commercial contractor?",
    a: "Large builders route you through account representatives and corporate managers who rarely visit your home. At My Team Renovation, we combine institutional precision with the high-touch care of a local, family-run business. You deal directly with the owner, Leonardo, who personally oversees your job site.",
  },
  {
    q: "Will my daily work-from-home routine be heavily disrupted during construction?",
    a: "We build with your professional schedule in mind. Our crews work within strict, predictable hours, establish heavy-duty dust barriers, and utilize advanced dust-extraction tools. Active on-site management ensures noise levels are controlled around your critical meeting windows.",
  },
  {
    q: "Can the initial estimate change once construction begins?",
    a: "Financial transparency is our foundational rule. The price locked into your approved proposal is exactly what you pay. If you choose to expand scope, update finishes, or alter design elements mid-remodel, we write a clear, itemized change order for your approval before executing any new work.",
  },
];

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Eyebrow>FAQ</Eyebrow>
          <Heading className="mt-6" as="h3">
            Frequently asked{" "}
            <span className="text-gold-gradient italic">questions.</span>
          </Heading>
          <p className="mt-6 text-muted-foreground">
            Answers to the most common questions we receive from discerning homeowners.
          </p>
        </div>
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-6 text-left font-display text-lg text-foreground hover:no-underline hover:text-gold data-[state=open]:text-gold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

const SERVICE_OPTIONS = [
  "Bathroom Remodeling",
  "Flooring Installation",
  "Kitchen Remodeling",
  "Custom Carpentry & Finish Woodwork",
  "General Repairs & Interior Painting",
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

export function ContactFormSection() {
  const [services, setServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (s: string) => {
    setServices((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s],
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      services,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSubmitting(true);
    // Simulate submission — no backend wired yet.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setDone(true);
    toast.success("Thanks! Leonardo will reach out shortly.");
  };

  return (
    <Section id="contact" className="bg-obsidian">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Eyebrow className="justify-center">Application Form</Eyebrow>
          <Heading className="mt-6">
            Ready to transform your property with{" "}
            <span className="text-gold-gradient italic">absolute certainty?</span>
          </Heading>
          <p className="mt-6 text-muted-foreground">
            Fill out the brief form below and Leonardo will reach out directly to discuss your project.
          </p>
        </div>

        {done ? (
          <div className="mt-14 flex flex-col items-center border border-gold/40 bg-card p-12 text-center">
            <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.2} />
            <p className="mt-6 font-display text-2xl text-foreground">
              Thank you.
            </p>
            <p className="mt-3 max-w-md text-muted-foreground">
              Your request is in. Leonardo will contact you shortly to schedule your on-site consultation.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-14 border border-border bg-card/40 p-8 md:p-12"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-gold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="h-12 rounded-none border-border bg-obsidian text-foreground focus-visible:ring-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-gold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-12 rounded-none border-border bg-obsidian text-foreground focus-visible:ring-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-gold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="h-12 rounded-none border-border bg-obsidian text-foreground focus-visible:ring-gold"
                />
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="text-xs uppercase tracking-[0.2em] text-gold">
                Remodeling Service Needed
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((s) => {
                  const checked = services.includes(s);
                  return (
                    <label
                      key={s}
                      className={`flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                        checked
                          ? "border-gold bg-gold/5 text-foreground"
                          : "border-border bg-obsidian text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggle(s)}
                        className="data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-primary-foreground"
                      />
                      <span className="text-sm">{s}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-10 h-14 w-full rounded-none bg-gold-gradient text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] hover:opacity-95"
            >
              {submitting ? "Sending…" : "Connect Directly with My Team Renovation"}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}

export function FinalCtaSection() {
  return (
    <Section className="border-y border-border">
      <div className="mx-auto max-w-4xl text-center">
        <Heading>
          Don't put off your family's comfort out of fear of{" "}
          <span className="text-gold-gradient italic">contractor delays.</span>
        </Heading>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          My Team Renovation delivers master-level craftsmanship, efficient timelines, and the personal respect your home deserves.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-flex h-14 items-center justify-center bg-gold-gradient px-10 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-opacity hover:opacity-95"
        >
          Contact Leonardo Directly
          <ArrowRight className="ml-3 h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
