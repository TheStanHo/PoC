import type { CafeHour, MenuItem } from "./types";

export const cafe = {
  name: "Petit Crumb",
  tagline: "Baked soft. Served slow.",
  blurb:
    "A quiet neighbourhood bakery cafe for warm pastries, gentle coffee, and unhurried mornings.",
  about:
    "Petit Crumb began as a tiny morning bake stall and grew into a soft little cafe where flour, butter, and slow coffee share the same table. We keep the menu small on purpose: a few things made carefully, every day.",
  addressLines: ["48 Bloom Lane", "Example City, EC1 2AB"],
  email: "hello@petitcrumb.example.com",
  phone: "+1 (555) 014-2208",
  heroImage:
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1800&q=80",
  aboutImage:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
  visitImage:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
};

export const menuItems: MenuItem[] = [
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky layers, soft centre, baked fresh before open.",
    price: "£4.50",
    category: "Bakes",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "berry-danish",
    name: "Berry Danish",
    description: "Vanilla cream, seasonal berries, light glaze.",
    price: "£5.25",
    category: "Bakes",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cinnamon-swirl",
    name: "Cinnamon Swirl",
    description: "Soft dough, brown sugar, a whisper of cardamom.",
    price: "£4.75",
    category: "Bakes",
  },
  {
    id: "lemon-loaf",
    name: "Lemon Olive Oil Loaf",
    description: "Bright citrus crumb with a soft glaze finish.",
    price: "£4.25",
    category: "Bakes",
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Silky milk over a double espresso.",
    price: "£4.00",
    category: "Drinks",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drip-coffee",
    name: "House Drip",
    description: "Bright, gentle filter coffee. Always rotating.",
    price: "£3.25",
    category: "Drinks",
  },
  {
    id: "matcha-latte",
    name: "Soft Matcha",
    description: "Ceremonial-grade matcha with steamed oat milk.",
    price: "£5.00",
    category: "Drinks",
  },
  {
    id: "chai",
    name: "Honey Chai",
    description: "Spiced tea, warm milk, a spoon of local honey.",
    price: "£4.50",
    category: "Drinks",
  },
  {
    id: "egg-toast",
    name: "Soft Egg Toast",
    description: "Sourdough, soft scramble, herbs, cultured butter.",
    price: "£9.50",
    category: "Savory",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cheese-scone",
    name: "Cheddar Thyme Scone",
    description: "Savoury, tender, best with a little butter.",
    price: "£4.00",
    category: "Savory",
  },
  {
    id: "tomato-tart",
    name: "Tomato Tartlet",
    description: "Buttery shell, slow roasted tomato, soft cheese.",
    price: "£6.50",
    category: "Savory",
  },
];

export const cafeHours: CafeHour[] = [
  { day: "Mon – Fri", hours: "7:30 am – 4:00 pm" },
  { day: "Saturday", hours: "8:00 am – 5:00 pm" },
  { day: "Sunday", hours: "8:30 am – 3:00 pm" },
];

export const menuCategories = ["Bakes", "Drinks", "Savory"] as const;
