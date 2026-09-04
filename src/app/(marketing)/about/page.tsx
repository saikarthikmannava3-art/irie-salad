import type { Metadata } from "next";
import { Leaf, Heart, Users, Award, Flame, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | IRIE Kitchen | Ancient Food Wisdom, Modern Kitchen",
  description:
    "IRIE Kitchen is a pure-vegetarian Indian food company. We bring ancient food wisdom and traditional cooking techniques to everyday meals. Better Indian food, delivered daily.",
  alternates: { canonical: "https://iriekitchen.in/about" },
};

const VALUES = [
  { icon: Leaf, title: "Farm to Fork", desc: "We source directly from local farms to ensure the freshest ingredients reach your plate every day." },
  { icon: Heart, title: "Nutrition First", desc: "Every meal is designed to provide balanced nutrition using traditional Indian dietary wisdom." },
  { icon: Users, title: "Community Driven", desc: "We believe better Indian food should be accessible, affordable, and enjoyable for everyone." },
  { icon: Award, title: "Quality Promise", desc: "Rigorous quality control at every step from procurement to your doorstep delivery." },
];

const TECHNIQUES = [
  { name: "Soaking & Sprouting", desc: "Unlocking nutrients the traditional way" },
  { name: "Fermentation", desc: "Natural fermentation for gut health" },
  { name: "Steaming", desc: "Gentle cooking that preserves nutrition" },
  { name: "Tandoori & Roasting", desc: "Bold flavors without deep frying" },
  { name: "Slow Cooking", desc: "Patient preparation for deeper taste" },
  { name: "Light Sauteing", desc: "Minimal oil, maximum flavor" },
];

const STANDARDS = [
  "Minimal oil in every preparation",
  "No deep frying, ever",
  "Fresh ingredients sourced daily",
  "Balanced portions, balanced macros",
  "FSSAI compliant food safety",
  "Temperature-controlled cold chain",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest">About IRIE Kitchen</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;re an Indian food company on a mission to make everyday meals better.
          Ancient food wisdom. Modern kitchen.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="rounded-2xl bg-cream p-8 md:p-12">
          <h2 className="text-2xl font-bold text-forest mb-4">Our Story</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              IRIE Kitchen was born from a simple belief: Indian food is already one of the
              world&apos;s greatest cuisines. It just needs a modern kitchen to bring out its best.
            </p>
            <p>
              We&apos;re not a diet company. We&apos;re not a health fad. We&apos;re an Indian food
              company that respects traditional cooking techniques: soaking, sprouting,
              fermentation, steaming, roasting. We apply them with care and consistency
              every single day.
            </p>
            <p>
              Our central kitchen operates with food processing excellence at its core.
              Every ingredient is carefully sourced, every recipe thoughtfully prepared,
              and every meal freshly made each day. From our kitchen to your door,
              we handle the entire journey so you can enjoy better Indian food without the effort.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center text-forest mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                <v.icon size={24} />
              </div>
              <h3 className="font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Food Philosophy */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-forest">Our Food Philosophy</h2>
          <p className="mt-3 text-muted-foreground">Traditional cooking techniques, applied with modern consistency</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNIQUES.map((tech) => (
            <div key={tech.name} className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center gap-3 mb-2">
                <Flame size={18} className="text-mustard shrink-0" />
                <h3 className="font-semibold text-foreground">{tech.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The IRIE Standard */}
      <div className="mb-16 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-forest/5 border border-forest/20 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Droplets size={24} className="text-forest" />
            <h2 className="text-2xl font-bold text-forest">The IRIE Standard</h2>
          </div>
          <p className="text-foreground/80 mb-6">
            Every meal that leaves our kitchen meets these non-negotiable standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STANDARDS.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <Award size={14} className="text-forest shrink-0" />
                <span className="text-foreground/80">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
