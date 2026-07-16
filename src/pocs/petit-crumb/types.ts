export type MenuCategory = "Bakes" | "Drinks" | "Savory";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  featured?: boolean;
  imageUrl?: string;
};

export type CafeHour = {
  day: string;
  hours: string;
};
