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
  { name: "React", Icon: ReactIcon },
  { name: "TypeScript", Icon: TypeScript },
  { name: "Next.js", Icon: Nextjs },
  { name: "Tailwind CSS", Icon: Tailwind },
  { name: "Node.js", Icon: Node },
  { name: "Express.js", Icon: Express },
  { name: "MongoDB", Icon: MongoDB },
  { name: "GraphQL", Icon: GraphQL },
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
    Icon: tech.Icon,
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
    <div className="min-h-screen pt-32 py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden relative">
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-white tracking-tight">
            {t("game.title")}
          </h2>
          <p className="text-lg sm:text-2xl text-white/40 max-w-2xl mx-auto font-light">
            {t("game.subtitle")}
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-[0.03]" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    {t("game.moves")}
                  </p>
                  <p className="text-3xl font-black text-white">
                    {moves}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    {t("game.status")}
                  </p>
                  <p className={`text-xl font-black ${allMatched ? "text-green-400" : "text-blue-400"}`}>
                    {allMatched ? t("game.won") : t("game.playing")}
                  </p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="px-8 py-4 bg-white text-black rounded-full font-black text-sm tracking-tighter hover:bg-blue-400 transition-all shadow-2xl"
              >
                {t("game.newGame")}
              </button>
            </div>

            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center"
              >
                <p className="text-xl font-bold text-green-400">
                  🎉 {t("game.congratulations").replace("{moves}", moves.toString())}
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-4 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  disabled={isProcessing || card.matched}
                  className={`aspect-square rounded-2xl transition-all duration-500 transform flex items-center justify-center border ${
                    card.flipped || card.matched
                      ? "bg-white text-black border-white scale-105"
                      : "bg-white/5 text-transparent border-white/10 hover:bg-white/10 scale-100 hover:scale-105"
                  } ${
                    card.matched
                      ? "opacity-20 cursor-not-allowed"
                      : "cursor-pointer"
                  } shadow-2xl relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-dots opacity-[0.05]" />
                  {card.flipped || card.matched ? (
                    <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center">
                        <card.Icon className="w-full h-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tighter text-center">
                        {card.value}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl sm:text-3xl text-white/20 font-black relative z-10 group-hover:text-white/40 transition-colors">?</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/20">{t("game.instructions")}</p>
        </div>
      </div>
    </div>
  );
};
