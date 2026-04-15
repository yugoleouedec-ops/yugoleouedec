"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  HairType,
  Problem,
  Goal,
  Budget,
  AnalysisResult,
  FlowState,
} from "./types";

interface FlowActions {
  setHairType: (type: HairType) => void;
  setPhoto: (base64: string) => void;
  skipPhoto: () => void;
  setProblems: (problems: Problem[]) => void;
  setGoal: (goal: Goal) => void;
  setBudget: (budget: Budget) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  reset: () => void;
}

const initialState: FlowState = {
  hairType: null,
  photoBase64: null,
  photoSkipped: false,
  problems: [],
  goal: null,
  budget: null,
  analysisResult: null,
};

export const useFlowStore = create<FlowState & FlowActions>()(
  persist(
    (set) => ({
      ...initialState,
      setHairType: (hairType) => set({ hairType }),
      setPhoto: (base64) =>
        set({ photoBase64: base64, photoSkipped: false }),
      skipPhoto: () => set({ photoBase64: null, photoSkipped: true }),
      setProblems: (problems) => set({ problems }),
      setGoal: (goal) => set({ goal }),
      setBudget: (budget) => set({ budget }),
      setAnalysisResult: (result) => set({ analysisResult: result }),
      reset: () => set(initialState),
    }),
    {
      name: "hairscan-flow",
      partialize: (state) => ({
        hairType: state.hairType,
        photoSkipped: state.photoSkipped,
        problems: state.problems,
        goal: state.goal,
        budget: state.budget,
        analysisResult: state.analysisResult,
        // Don't persist photoBase64 — too large for localStorage
      }),
    }
  )
);
