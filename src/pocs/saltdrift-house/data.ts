import type { Room, SpaRitual } from "./types";

export const hotel = {
  name: "Saltdrift House",
  tagline: "Soft days by the waterline.",
  blurb:
    "A coastal boutique hotel and spa for unhurried mornings, linen-quiet rooms, and sea air that settles the mind.",
  about:
    "Saltdrift House sits above a quiet cove where the light turns linen-soft by afternoon. Guests come for the rooms, stay for the spa, and leave with the sound of the tide still in their pockets.",
  addressLines: ["12 Headland Walk", "Saltdrift Bay, SB2 4LN"],
  email: "stay@saltdrift.example.com",
  phone: "+1 (555) 018-4402",
  heroImage:
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=80",
  spaImage:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
  coastImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
};

export const rooms: Room[] = [
  {
    id: "tide-suite",
    name: "Tide Suite",
    summary: "Wide windows, pale linen, and a private terrace toward the cove.",
    detail:
      "Our largest room for longer stays. Soft oak floors, a deep soaking tub, and morning light that arrives before the breakfast tray.",
    imageUrl:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "drift-room",
    name: "Drift Room",
    summary: "A quieter corner room with sea-mist tones and a reading nook.",
    detail:
      "Designed for rest more than spectacle. Washed linen, a low lounge chair, and just enough space to unpack and slow down.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "cove-loft",
    name: "Cove Loft",
    summary: "An upper-floor loft with pitched ceilings and distant water views.",
    detail:
      "A light-filled loft for two. Layered textiles, a compact writing desk, and evening air that smells faintly of salt and cedar.",
    imageUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
  },
];

export const spaRituals: SpaRitual[] = [
  {
    id: "shoreline-restore",
    name: "Shoreline Restore",
    duration: "90 min",
    description:
      "A warm oil massage with sea-mineral scrub and cool linen compress.",
  },
  {
    id: "mist-facial",
    name: "Mist Facial",
    duration: "60 min",
    description:
      "A calm facial ritual using soft botanicals and a long steam finish.",
  },
  {
    id: "tide-soak",
    name: "Tide Soak",
    duration: "45 min",
    description:
      "Private mineral soak, heated stones, and quiet time with the windows open.",
  },
];
