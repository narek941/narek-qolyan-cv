"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ReactIcon,
  TypeScript,
  Node,
  Nextjs,
  Tailwind,
  Express,
  MongoDB,
  GraphQL,
} from "@/components/TechnologyIcons";
import type { Card } from "@/types/components.types";

const TECHNOLOGY_PAIRS = [
  { name: "React", icon: <ReactIcon className="w-8 h-8" /> },
  { name: "TypeScript", icon: <TypeScript className="w-8 h-8" /> },
  { name: "Next.js", icon: <Nextjs className="w-8 h-8" /> },
  { name: "Tailwind CSS", icon: <Tailwind className="w-8 h-8" /> },
  { name: "Node.js", icon: <Node className="w-8 h-8" /> },
  { name: "Express.js", icon: <Express className="w-8 h-8" /> },
  { name: "MongoDB", icon: <MongoDB className="w-8 h-8" /> },
  { name: "GraphQL", icon: <GraphQL className="w-8 h-8" /> },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (): Card[] => {
  const pairs = [...TECHNOLOGY_PAIRS, ...TECHNOLOGY_PAIRS];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((tech, index) => ({
    id: index,
    value: tech.name,
    icon: tech.icon,
    flipped: false,
    matched: false,
  }));
};

export const GameSection = () => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<Card[]>(createCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkMatch = useCallback(() => {
    if (flippedCards.length !== 2) return;

    setIsProcessing(true);
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    setTimeout(() => {
      if (firstCard.value === secondCard.value) {
        setCards((prev) =>
          prev.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, matched: true, flipped: false }
              : card
          )
        );
        setGameWon((prev) => {
          const newCards = cards.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, matched: true }
              : card
          );
          return newCards.every((card) => card.matched);
        });
      } else {
        setCards((prev) => prev.map((card) => ({ ...card, flipped: false })));
      }
      setFlippedCards([]);
      setIsProcessing(false);
    }, 1000);
  }, [flippedCards, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, checkMatch]);

  const handleCardClick = (index: number) => {
    if (
      isProcessing ||
      cards[index].flipped ||
      cards[index].matched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, flipped: true } : card))
    );
    setFlippedCards((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
    setIsProcessing(false);
  };

  const allMatched = cards.every((card) => card.matched);

  return (
    <div className="min-h-screen pt-24 sm:pt-20 py-12 sm:py-20 px-3 sm:px-4 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white break-words px-2">
          {t("game.title")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base px-2">
          {t("game.subtitle")}
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t("game.moves")}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                {moves}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-4 sm:px-6 py-2 bg-primary-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-700 transition-colors w-full sm:w-auto"
            >
              {t("game.newGame")}
            </button>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t("game.status")}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {allMatched ? `✓ ${t("game.won")}` : t("game.playing")}
              </p>
            </div>
          </div>

          {gameWon && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
              <p className="text-base sm:text-lg font-semibold text-green-800 dark:text-green-400">
                🎉{" "}
                {t("game.congratulations").replace("{moves}", moves.toString())}
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                disabled={isProcessing || card.matched}
                className={`aspect-square rounded-lg transition-all duration-300 transform flex items-center justify-center ${
                  card.flipped || card.matched
                    ? "bg-primary-500 text-white scale-100"
                    : "bg-gray-300 dark:bg-slate-700 text-transparent hover:bg-gray-400 dark:hover:bg-slate-600 scale-95 hover:scale-100"
                } ${
                  card.matched
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {card.flipped || card.matched ? (
                  <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8">
                      {card.icon}
                    </div>
                    <span className="text-[8px] sm:text-xs font-medium leading-tight">
                      {card.value}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg sm:text-2xl md:text-3xl">?</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-xs sm:text-sm">{t("game.instructions")}</p>
        </div>
      </div>
    </div>
  );
};
