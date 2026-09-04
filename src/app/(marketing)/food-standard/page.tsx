import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Leaf, Shield, Droplets, Award, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Food Standard | IRIE Kitchen Cooking Philosophy & Principles",
  description:
    "Learn about the IRIE Food Standard: ancient food wisdom, traditional cooking techniques, minimal oil, no deep frying, FSSAI compliant. Better Indian food, every day.",
  alternates: { canonical: "https://iriekitchen.in/food-standard" },
};

const COOKING_PRINCIPLES = [
  "Minimal oil in every preparation",
  "No deep frying, ever",
  "Fresh ingredients sourced daily",
  "Balanced portions, balanced macros",
  "Seasonal ingredients when possible",
  "Traditional spice blending",
];

const TECHNIQUES = [
  { name: "Steaming", desc: "Gentle cooking that preserves nutrients and natural flavors. Used for idlis, dhoklas, and vegetable preparations." },
  { name: "Tandoori & Roasting", desc: "Dry-heat cooking for bold flavors without excess oil. Used for paneer, vegetables, and flatbreads." },
  { name: "Fermentation", desc: "Natural fermentation for gut health and bioavailability. Used in dosa batters, kanji, and chutneys." },
  { name: "Sprouting", desc: "Unlocking protein and nutrients in legumes and grains the traditional way." },
  { name: "Soaking", desc: "Pre-soaking grains, lentils, and nuts to improve digestibility and nutrition." },
  { name: "Slow Cooking", desc: "Patient preparation for deeper flavors and better nutrient extraction. Used in dals and curries." },
  { name: "Light Sauteing", desc: "Quick cooking with minimal oil to retain crunch, color, and vitamins in vegetables." },
  { name: "Roasting & Tempering", desc: "Dry-roasting spices and tadka to release essential oils and deepen flavor profiles." },
];

const NUTRITION_POINTS = [
  "Fiber and protein conscious in every meal",
  "Balanced macros across the day",
  "Traditional Indian nutritional pairing (dal-rice, roti-sabzi)",
  "Nutrient-dense ingredients over empty calories",
  "Portion sizes designed for sustained energy",
  "No artificial preservatives or additives",
];

const FOOD_SAFETY = [
  "FSSAI compliant kitchen and processes",
  "Temperature monitoring at every stage",
  "Rapid chilling after cooking",
  "Cold-chain maintained during delivery",
  "Tamper-proof packaging",
  "Daily hygiene audits",
];

export default function FoodStandardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest sm:text-5xl">The IRIE Food Standard</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ancient food wisdom. Modern kitchen. Every meal we make follows these
          non-negotiable principles.
        </p>
      </div>

      {/* Philosophy */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="rounded-2xl bg-cream p-8 md:p-12">
          <h2 className="text-2xl font-bold text-forest mb-4">Our Philosophy</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Indian food is already one of the world&apos;s most nutritionally sophisticated
              cuisines. Generations of food wisdom, from Ayurvedic dietary principles to
              regional cooking traditions, have created techniques that maximize nutrition,
              digestibility, and flavor.
            </p>
            <p>
              At IRIE Kitchen, we don&apos;t reinvent Indian food. We respect it. We apply
              these time-tested techniques with modern consistency, hygiene standards,
              and portion control to deliver better everyday meals.
            </p>
          </div>
        </div>
      </div>

      {/* Cooking Principles */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Droplets size={24} className="text-forest" />
            <h2 className="text-2xl font-bold text-forest">Cooking Principles</h2>
          </div>
          <p className="text-muted-foreground">The rules our kitchen lives by</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COOKING_PRINCIPLES.map((principle) => (
            <div key={principle} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
              <Check size={18} className="text-forest shrink-0" />
              <span className="text-sm font-medium text-foreground">{principle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Techniques */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame size={24} className="text-mustard" />
            <h2 className="text-2xl font-bold text-forest">Traditional Techniques</h2>
          </div>
          <p className="text-muted-foreground">The methods behind the meals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TECHNIQUES.map((tech) => (
            <div key={tech.name} className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-semibold text-foreground mb-2">{tech.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Approach */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf size={24} className="text-forest" />
            <h2 className="text-2xl font-bold text-forest">Nutrition Approach</h2>
          </div>
          <p className="text-muted-foreground">Guided by tradition, measured with care</p>
        </div>
        <div className="rounded-2xl bg-forest/5 border border-forest/20 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NUTRITION_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Award size={16} className="text-forest shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Food Safety */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={24} className="text-forest" />
            <h2 className="text-2xl font-bold text-forest">Food Safety</h2>
          </div>
          <p className="text-muted-foreground">Your safety is non-negotiable</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOOD_SAFETY.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
              <Shield size={16} className="text-forest shrink-0" />
              <span className="text-sm text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-2xl bg-forest py-12 px-6">
        <h2 className="text-2xl font-bold text-white mb-3">Taste the IRIE standard</h2>
        <p className="text-white/70 mb-6">Better Indian food, every day. See what&apos;s on the menu.</p>
        <Link href="/menu">
          <Button size="lg" className="bg-mustard text-white hover:bg-mustard-light text-base px-8">
            Explore Menu
          </Button>
        </Link>
      </div>
    </div>
  );
}
