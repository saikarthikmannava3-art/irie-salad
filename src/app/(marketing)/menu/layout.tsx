import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Fresh Indian Meals for Every Occasion",
  description:
    "Explore the IRIE Kitchen menu. Breakfast, lunch, snacks and dinner. Fresh Indian meals prepared daily with traditional techniques and modern nutrition.",
  alternates: { canonical: "https://iriekitchen.in/menu" },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
