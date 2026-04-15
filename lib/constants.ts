import type { HairType, Problem, Goal, Budget } from "./types";
import { hairThemes } from "./theme";

export interface HairTypeOption {
  id: HairType;
  label: string;
  description: string;
  color: string;
  image?: string | null;
}

export const HAIR_TYPES: HairTypeOption[] = [
  {
    id: "lisses",
    label: "Raides",
    description: "Cheveux droits, sans ondulation ni boucle visible",
    color: hairThemes.lisses.accentColor,
    image: "/images/hair-types/raides.png",
  },
  {
    id: "ondules",
    label: "Lisses",
    description: "Légères vagues naturelles, texture souple en S",
    color: hairThemes.ondules.accentColor,
    image: "/images/hair-types/lisses.png",
  },
  {
    id: "boucles",
    label: "Bouclés",
    description: "Boucles bien définies, texture ressort naturelle",
    color: hairThemes.boucles.accentColor,
    image: "/images/hair-types/boucles.png",
  },
  {
    id: "crepus",
    label: "Curly",
    description: "Texture serrée en zigzag, volume naturel important",
    color: hairThemes.crepus.accentColor,
    image: null,
  },
];

export interface OptionItem {
  id: string;
  label: string;
  emoji: string;
}

export const PROBLEMS: (OptionItem & { id: Problem })[] = [
  { id: "plats", label: "Cheveux plats / Z\u00e9ro volume", emoji: "\u{1F4A8}" },
  { id: "gras", label: "Cheveux qui graissent vite", emoji: "\u{1F6E2}\uFE0F" },
  { id: "densite", label: "Manque de densit\u00e9", emoji: "\u{1F9F6}" },
  { id: "pellicules", label: "Pellicules", emoji: "\u2744\uFE0F" },
  { id: "abimes", label: "Cheveux abîm\u00e9s", emoji: "\u{1F525}" },
  { id: "frisottis", label: "Frisottis", emoji: "\u{1F32B}\uFE0F" },
  { id: "aucun", label: "Aucun probl\u00e8me", emoji: "\u2705" },
];

export const GOALS: (OptionItem & { id: Goal })[] = [
  { id: "volume", label: "Plus de volume", emoji: "\u{1F4A8}" },
  { id: "tenue", label: "Une coupe qui tient", emoji: "\u{1F4AA}" },
  { id: "degraissage", label: "Arr\u00eater d\u2019avoir les cheveux gras", emoji: "\u{1F6E2}\uFE0F" },
  { id: "texture", label: "Meilleure texture", emoji: "\u{1F30A}" },
  { id: "densite", label: "Cheveux plus \u00e9pais / plus denses", emoji: "\u{1F331}" },
  { id: "antipelliculaire", label: "Arr\u00eater les pellicules / d\u00e9mangeaisons", emoji: "\u2744\uFE0F" },
];

export const BUDGETS: (OptionItem & { id: Budget })[] = [
  { id: "moins-20", label: "Moins de 20\u20AC", emoji: "\u{1F4B6}" },
  { id: "20-50", label: "20\u20AC - 50\u20AC", emoji: "\u{1F4B0}" },
  { id: "50-100", label: "50\u20AC - 100\u20AC", emoji: "\u{1F48E}" },
  { id: "100-plus", label: "Plus de 100\u20AC", emoji: "\u{1F451}" },
  { id: "variable", label: "Pas de budget fixe", emoji: "\u{1F937}" },
];

export const LOADER_MESSAGES = [
  "Analyse de la texture...",
  "D\u00E9tection de la porosit\u00E9...",
  "Identification des besoins...",
  "S\u00E9lection des produits...",
  "G\u00E9n\u00E9ration de ta routine...",
];
