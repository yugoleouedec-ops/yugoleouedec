export type HairType =
  | "lisses"
  | "ondules"
  | "boucles"
  | "crepus"
  | "semi-lisses";

export type HairTypeDetailed =
  | "lisses"
  | "ondules_2A"
  | "ondules_2B"
  | "ondules_2C"
  | "boucles_3A"
  | "boucles_3B"
  | "boucles_3C"
  | "crepus_4A"
  | "crepus_4B"
  | "crepus_4C"
  | "semi-lisses";

export type Porosity = "faible" | "moyenne" | "haute";
export type HairHealth = "sain" | "abime" | "tres-abime";
export type Problem =
  | "plats"
  | "gras"
  | "densite"
  | "pellicules"
  | "abimes"
  | "frisottis"
  | "aucun";
export type Goal =
  | "volume"
  | "tenue"
  | "degraissage"
  | "texture"
  | "densite"
  | "antipelliculaire";
export type Budget =
  | "moins-20"
  | "20-50"
  | "50-100"
  | "100-plus"
  | "variable";

export type ProductCategory =
  | "shampooing"
  | "apres-shampooing"
  | "leave-in"
  | "gel"
  | "mousse"
  | "huile"
  | "masque"
  | "serum";

export type BudgetCat = "economique" | "moyen" | "premium";

export interface Product {
  id: string;
  nom: string;
  marque: string;
  categorie: ProductCategory;
  prix: number;
  devise: string;
  typesCheveux: HairType[];
  porosite: Porosity[];
  problemes: Problem[];
  objectifs: Goal[];
  budgetCategorie: BudgetCat;
  ingredientsCles: string[];
  sans: string[];
  vegan: boolean;
  bio: boolean;
  noteUtilisateurs: number;
  nombreAvis: number;
  imageUrl: string;
  descriptionCourte: string;
  lienAmazon: string;
  active: boolean;
}

export interface AnalysisResult {
  profile: {
    typeConfirme: HairTypeDetailed;
    porosite: Porosity;
    etat: HairHealth;
  };
  routine: {
    frequenceLavage: string;
    conseils: string[];
    gestes: string[];
  };
  products: Product[];
  coutTotal: number;
}

export interface FlowState {
  hairType: HairType | null;
  photoBase64: string | null;
  photoSkipped: boolean;
  problems: Problem[];
  goal: Goal | null;
  budget: Budget | null;
  analysisResult: AnalysisResult | null;
}
