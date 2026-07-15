import type { PortfolioProject, PortfolioService } from "./types";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "studio-identity",
    title: "Studio North Identity",
    category: "Brand Identity",
    year: "2026",
    description:
      "A calm visual identity system for a fictional interior design studio.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    tags: ["Logo", "Typography", "Brand Guide"],
  },
  {
    id: "festival-posters",
    title: "Arcade Nights Poster Series",
    category: "Print Design",
    year: "2026",
    description:
      "Bold event posters using layered colour, grain, and expressive type.",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    tags: ["Poster", "Art Direction", "Layout"],
  },
  {
    id: "packaging-concept",
    title: "Bloom Coffee Packaging",
    category: "Packaging",
    year: "2025",
    description:
      "A playful packaging concept for a small-batch coffee subscription.",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    tags: ["Packaging", "Illustration", "Colour"],
  },
  {
    id: "editorial-layout",
    title: "Field Notes Editorial",
    category: "Editorial",
    year: "2025",
    description:
      "A magazine-style layout concept for travel essays and visual stories.",
    imageUrl:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Editorial", "Grid", "Photography"],
  },
];

export const portfolioServices: PortfolioService[] = [
  {
    title: "Brand Identity",
    description:
      "Logos, visual systems, colour palettes, typography, and brand guidelines.",
  },
  {
    title: "Digital Design",
    description:
      "Landing pages, campaign visuals, presentation design, and social assets.",
  },
  {
    title: "Print & Packaging",
    description:
      "Posters, brochures, labels, packaging mockups, and launch materials.",
  },
];
