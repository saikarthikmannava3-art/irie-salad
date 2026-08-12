import { Leaf, Heart, Users, Award } from "lucide-react";

const VALUES = [
  { icon: Leaf, title: "Farm to Fork", desc: "We source directly from local farms to ensure freshness and support sustainable agriculture." },
  { icon: Heart, title: "Nutrition First", desc: "Every salad is designed by nutritionists to provide balanced macros and maximum micronutrients." },
  { icon: Users, title: "Community Driven", desc: "We believe healthy eating should be accessible, affordable, and enjoyable for everyone." },
  { icon: Award, title: "Quality Promise", desc: "Rigorous quality control at every step from procurement to your doorstep delivery." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest">About Irie Salad</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;re a farm-to-fork food company on a mission to make healthy eating easy,
          scalable, and consistent for everyone.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="rounded-2xl bg-cream p-8 md:p-12">
          <h2 className="text-2xl font-bold text-forest mb-4">Our Story</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Irie Salad was born from a simple belief: everyone deserves access to
              nutritious, delicious food without the hassle of planning, shopping, and prep.
            </p>
            <p>
              Our central kitchen operates with food processing excellence at its core.
              Every ingredient is carefully sourced, every recipe nutrition-optimized,
              and every salad freshly prepared each morning.
            </p>
            <p>
              From our kitchen to your door, we handle the entire journey so you can
              focus on what matters most — living your best, healthiest life.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
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
    </div>
  );
}
