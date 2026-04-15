import type {
  HairType,
  HairTypeDetailed,
  Problem,
  Goal,
  Budget,
  Product,
  AnalysisResult,
  Porosity,
} from "./types";

// --- Import products by budget tier ---
import productsEco from "@/data/products/economique.json";
import productsMoy from "@/data/products/moyen.json";
import productsPre from "@/data/products/premium.json";

// --- Import routines by hair type ---
import routineLisses from "@/data/routines/lisses.json";
import routineOndules from "@/data/routines/ondules.json";
import routineBoucles from "@/data/routines/boucles.json";
import routineCrepus from "@/data/routines/crepus.json";
import routineSemiLisses from "@/data/routines/semi-lisses.json";

// --- Import tips by hair type ---
import tipsLisses from "@/data/tips/lisses.json";
import tipsOndules from "@/data/tips/ondules.json";
import tipsBoucles from "@/data/tips/boucles.json";
import tipsCrepus from "@/data/tips/crepus.json";
import tipsSemiLisses from "@/data/tips/semi-lisses.json";

// ---------- Maps ----------

const allProducts = [
  ...productsEco,
  ...productsMoy,
  ...productsPre,
] as Product[];

const PRODUCT_POOLS: Record<Budget, Product[]> = {
  "moins-20": productsEco as Product[],
  "20-50": [...productsEco, ...productsMoy] as Product[],
  "50-100": [...productsMoy, ...productsPre] as Product[],
  "100-plus": productsPre as Product[],
  variable: allProducts,
};

interface RoutineFile {
  type: string;
  frequenceLavage: string;
  conseils: string[];
  gestes: string[];
  astuces: string[];
  variantes: Record<string, { conseilsSupp: string[]; astucesSupp: string[] }>;
}

const ROUTINES: Record<HairType, RoutineFile> = {
  lisses: routineLisses as RoutineFile,
  ondules: routineOndules as RoutineFile,
  boucles: routineBoucles as RoutineFile,
  crepus: routineCrepus as RoutineFile,
  "semi-lisses": routineSemiLisses as RoutineFile,
};

interface TipEntry {
  problemes: string[];
  objectifs: string[];
  astuce: string;
}

const TIPS: Record<HairType, TipEntry[]> = {
  lisses: tipsLisses as TipEntry[],
  ondules: tipsOndules as TipEntry[],
  boucles: tipsBoucles as TipEntry[],
  crepus: tipsCrepus as TipEntry[],
  "semi-lisses": tipsSemiLisses as TipEntry[],
};

const DETAILED_TYPE_MAP: Record<HairType, HairTypeDetailed> = {
  lisses: "lisses",
  ondules: "ondules_2B",
  boucles: "boucles_3B",
  crepus: "crepus_4A",
  "semi-lisses": "semi-lisses",
};

const POROSITY_MAP: Record<HairType, Porosity> = {
  lisses: "faible",
  ondules: "moyenne",
  boucles: "moyenne",
  crepus: "haute",
  "semi-lisses": "faible",
};

// ---------- Scoring ----------

function calculateProductScore(
  product: Product,
  hairType: HairType,
  problems: Problem[],
  goal: Goal
): number {
  let score = 0;

  // Type match (+30)
  if (product.typesCheveux.includes(hairType)) score += 30;

  // Porosity match (+20)
  if (product.porosite.includes(POROSITY_MAP[hairType])) score += 20;

  // Problem match (+25, weighted)
  const activeProblems = [...problems];
  if (activeProblems.length > 0) {
    const matches = activeProblems.filter((p) =>
      product.problemes.includes(p)
    ).length;
    score += (matches / activeProblems.length) * 25;
  } else {
    score += 12;
  }

  // Goal match (+15)
  if (product.objectifs.includes(goal)) score += 15;

  return score;
}

// ---------- Routine builder ----------

function buildRoutine(
  hairType: HairType,
  problems: Problem[]
): { frequenceLavage: string; conseils: string[]; gestes: string[] } {
  const routine = ROUTINES[hairType];

  // Start with base
  const conseils = [...routine.conseils];
  const gestes = [...routine.gestes];

  // Add problem-specific supplements
  for (const problem of problems) {
    const variante = routine.variantes[problem];
    if (variante) {
      for (const c of variante.conseilsSupp) {
        if (!c.startsWith("AJOUTE ICI")) conseils.push(c);
      }
      for (const a of variante.astucesSupp) {
        if (!a.startsWith("AJOUTE ICI")) conseils.push(a);
      }
    }
  }

  // Add base astuces (non-placeholder)
  for (const a of routine.astuces) {
    if (!a.startsWith("AJOUTE ICI")) conseils.push(a);
  }

  return { frequenceLavage: routine.frequenceLavage, conseils, gestes };
}

// ---------- Tips matcher ----------

function matchTips(
  hairType: HairType,
  problems: Problem[],
  goal: Goal
): string[] {
  const tips = TIPS[hairType] ?? [];
  const activeProblems = [...problems];

  return tips
    .filter((tip) => {
      if (tip.astuce.startsWith("AJOUTE ICI")) return false;
      const problemMatch = tip.problemes.some((p) =>
        (activeProblems as string[]).includes(p)
      );
      const goalMatch = tip.objectifs.some((o) => o === goal);
      return problemMatch && goalMatch;
    })
    .map((tip) => tip.astuce);
}

// ---------- Main analysis ----------

export function getMockAnalysis(
  hairType: HairType,
  problems: Problem[],
  goal: Goal,
  budget: Budget
): AnalysisResult {
  // 1. Pick product pool by budget
  const pool = PRODUCT_POOLS[budget].filter((p) => p.active);

  // 2. Score all products
  const scored = pool.map((product) => ({
    product,
    score: calculateProductScore(product, hairType, problems, goal),
  }));
  scored.sort((a, b) => b.score - a.score);

  // 3. Pick top 1 per category group
  const shampooing = scored.find((s) => s.product.categorie === "shampooing");
  const hydratation = scored.find((s) =>
    ["leave-in", "apres-shampooing", "huile", "serum"].includes(
      s.product.categorie
    )
  );
  const styling = scored.find((s) =>
    ["gel", "mousse", "masque"].includes(s.product.categorie)
  );

  const recommended = [shampooing, hydratation, styling]
    .filter(Boolean)
    .map((s) => s!.product);

  const coutTotal = recommended.reduce((sum, p) => sum + p.prix, 0);

  // 4. Build routine from data files
  const routine = buildRoutine(hairType, problems);

  // 5. Get expert tips and append to conseils
  const tips = matchTips(hairType, problems, goal);
  if (tips.length > 0) {
    routine.conseils.push(...tips);
  }

  return {
    profile: {
      typeConfirme: DETAILED_TYPE_MAP[hairType],
      porosite: POROSITY_MAP[hairType],
      etat:
        problems.includes("abimes") || problems.includes("frisottis")
          ? "abime"
          : "sain",
    },
    routine,
    products: recommended,
    coutTotal: Math.round(coutTotal * 100) / 100,
  };
}
