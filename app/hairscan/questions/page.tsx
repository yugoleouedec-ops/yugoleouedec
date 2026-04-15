"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FlowLayout } from "@/components/flow-layout";
import { QuestionOption } from "@/components/question-option";
import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/lib/store";
import { HAIR_TYPES, PROBLEMS, GOALS, BUDGETS } from "@/lib/constants";
import { getThemeForType, themeColors } from "@/lib/theme";
import type { Problem, Goal, Budget } from "@/lib/types";

export default function QuestionsPage() {
  const router = useRouter();
  const { hairType, setProblems, setGoal, setBudget } = useFlowStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const theme = getThemeForType(hairType);

  const step = questionIndex + 3; // steps 3, 4, 5

  const toggleProblem = (id: Problem) => {
    if (id === "aucun") {
      setSelectedProblems(["aucun"]);
      return;
    }
    setSelectedProblems((prev) => {
      const without = prev.filter((p) => p !== "aucun");
      return without.includes(id)
        ? without.filter((p) => p !== id)
        : [...without, id];
    });
  };

  const handleNext = () => {
    if (questionIndex === 0) {
      setProblems(selectedProblems);
      setQuestionIndex(1);
    } else if (questionIndex === 1) {
      setGoal(selectedGoal!);
      setQuestionIndex(2);
    } else {
      setBudget(selectedBudget!);
      router.push("/hairscan/analysis");
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      router.push("/hairscan/photo");
    }
  };

  const isValid =
    (questionIndex === 0 && selectedProblems.length > 0) ||
    (questionIndex === 1 && selectedGoal !== null) ||
    (questionIndex === 2 && selectedBudget !== null);

  const questions = [
    {
      title: "Quel est ton probl\u00e8me capillaire principal ?",
      subtitle: "Tu peux en s\u00e9lectionner plusieurs",
      render: () =>
        PROBLEMS.map((p) => (
          <QuestionOption
            key={p.id}
            emoji={p.emoji}
            label={p.label}
            selected={selectedProblems.includes(p.id)}
            onToggle={() => toggleProblem(p.id)}
            accentColor={theme.accentColor}
          />
        )),
    },
    {
      title: "Quel est ton objectif capillaire ?",
      subtitle: null,
      render: () =>
        GOALS.map((g) => (
          <QuestionOption
            key={g.id}
            emoji={g.emoji}
            label={g.label}
            selected={selectedGoal === g.id}
            onToggle={() => setSelectedGoal(g.id)}
            accentColor={theme.accentColor}
          />
        )),
    },
    {
      title: "Budget mensuel pour tes produits capillaires ?",
      subtitle: null,
      render: () =>
        BUDGETS.map((b) => (
          <QuestionOption
            key={b.id}
            emoji={b.emoji}
            label={b.label}
            selected={selectedBudget === b.id}
            onToggle={() => setSelectedBudget(b.id)}
            accentColor={theme.accentColor}
          />
        )),
    },
  ];

  const current = questions[questionIndex];

  return (
    <FlowLayout
      step={step}
      accentColor={theme.accentColor}
      gradient={theme.gradient}
      onBack={handleBack}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          className="flex flex-1 flex-col gap-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.25 }}
        >
          <div>
            <h1 className="mb-1 text-xl font-semibold" style={{ color: themeColors.textPrimary }}>{current.title}</h1>
            {current.subtitle && (
              <p className="text-sm" style={{ color: themeColors.textMuted }}>
                {current.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5">{current.render()}</div>

          <div className="mt-auto pt-4">
            <Button
              className="h-12 w-full text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 8px 24px ${theme.accentColor}4D`,
              }}
              disabled={!isValid}
              onClick={handleNext}
            >
              {questionIndex === 2 ? "Voir mon analyse" : "Suivant"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </FlowLayout>
  );
}
