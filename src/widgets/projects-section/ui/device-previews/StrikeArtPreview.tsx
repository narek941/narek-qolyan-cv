"use client";

import { useState } from "react";
import {
  Film,
  Image,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Video,
  Wand2,
} from "lucide-react";

type GenTab = "image" | "video" | "image-to-video";

interface VideoScene {
  id: string;
  action: string;
  environment: string;
}

const DEFAULT_SCENES: VideoScene[] = [
  {
    id: "s1",
    action: "Product reveal — slow dolly-in on hero item, soft rim light",
    environment: "Minimal studio, morning light, marble surface",
  },
  {
    id: "s2",
    action: "Lifestyle cut — hands unboxing, macro detail on texture",
    environment: "Bright loft, natural window light",
  },
];

const AI_PARSED_SCENES: VideoScene[] = [
  {
    id: "a1",
    action: "Opening hook — bold typography animates over gradient backdrop",
    environment: "Digital canvas, purple-to-blue gradient",
  },
  {
    id: "a2",
    action: "Feature montage — 3 quick cuts synced to beat drops",
    environment: "Mixed urban + studio B-roll",
  },
  {
    id: "a3",
    action: "CTA close — logo lockup with social-safe end card",
    environment: "Clean white stage, centered composition",
  },
];

/**
 * Strike Art System — AI social content studio from strike-art-system.
 * Multi-model image/video generation, scene-based video stitching, brand guidelines.
 */
export const StrikeArtPreview = () => {
  const [activeTab, setActiveTab] = useState<GenTab>("video");
  const [aiMode, setAiMode] = useState(true);
  const [scenes, setScenes] = useState(DEFAULT_SCENES);
  const [generating, setGenerating] = useState(false);
  const [stitched, setStitched] = useState(false);
  const [concept, setConcept] = useState(
    "Q2 launch — 15s social reel, energetic, on-brand"
  );

  const generateWithAi = () => {
    setGenerating(true);
    setStitched(false);
    window.setTimeout(() => {
      setScenes(AI_PARSED_SCENES);
      setGenerating(false);
      setStitched(true);
    }, 1400);
  };

  const addScene = () =>
    setScenes((current) => [
      ...current,
      {
        id: `s${current.length + 1}`,
        action: "New scene action…",
        environment: "Set location and lighting…",
      },
    ]);

  const removeScene = (id: string) =>
    setScenes((current) =>
      current.length > 1 ? current.filter((scene) => scene.id !== id) : current
    );

  const tabs: { id: GenTab; label: string; icon: typeof Image }[] = [
    { id: "image", label: "Images", icon: Image },
    { id: "video", label: "Videos", icon: Video },
    { id: "image-to-video", label: "Img→Vid", icon: Film },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-gray-50 text-gray-900">
      {/* App header — Strike Art System */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-[5px] font-black text-white">
            CS
          </div>
          <span className="text-[7px] font-semibold text-gray-800">
            Content Studio
          </span>
        </div>
        <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[5.5px] font-bold text-purple-700">
          Brand Campaign
        </span>
      </header>

      <div
        data-lenis-prevent
        className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-2"
      >
        <div>
          <p className="text-[8px] font-bold text-gray-900">Content Generation</p>
          <p className="text-[6px] text-gray-500">AI-powered social assets</p>
        </div>

        {/* Generation tabs */}
        <div className="grid grid-cols-3 gap-0.5 rounded-md border border-gray-200 bg-white p-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-0.5 rounded px-1 py-1 text-[6px] font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-2 w-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "image" && (
          <div className="rounded-lg border border-gray-200 bg-white p-2">
            <p className="text-[7px] font-bold">Image prompt</p>
            <p className="mt-1 rounded border border-gray-200 bg-gray-50 px-1.5 py-1 text-[6px] text-gray-600">
              Product hero shot, 1:1, brand palette, studio lighting
            </p>
            <button
              type="button"
              className="mt-1.5 w-full rounded bg-purple-600 py-1 text-[6px] font-bold text-white"
            >
              Generate image
            </button>
          </div>
        )}

        {activeTab === "image-to-video" && (
          <div className="rounded-lg border border-gray-200 bg-white p-2">
            <p className="text-[7px] font-bold">Animate selected asset</p>
            <div className="mt-1 grid grid-cols-3 gap-1">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className={`aspect-square rounded border ${
                    slot === 1
                      ? "border-purple-400 ring-1 ring-purple-300"
                      : "border-gray-200 bg-gray-100"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-1.5 w-full rounded bg-purple-600 py-1 text-[6px] font-bold text-white"
            >
              Image → Video
            </button>
          </div>
        )}

        {activeTab === "video" && (
          <div className="space-y-1.5">
            {/* Video concept panel */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-1">
                <p className="text-[7px] font-bold">Video Concept</p>
                <p className="text-[5.5px] text-gray-500">
                  Multi-scene · Leonardo / Veo 3
                </p>
              </div>
              <div className="space-y-1.5 p-2">
                <input
                  value={concept}
                  onChange={(event) => setConcept(event.target.value)}
                  className="w-full rounded border border-gray-200 px-1.5 py-0.5 text-[6px]"
                />

                <div className="flex items-center justify-between rounded border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-2 py-1">
                  <div className="flex items-center gap-0.5">
                    <Wand2 className="h-2 w-2 text-purple-600" />
                    <span className="text-[6px] font-semibold">AI Mode</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAiMode((mode) => !mode)}
                    className={`relative h-3 w-5 rounded-full transition-colors ${
                      aiMode ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-2 w-2 rounded-full bg-white transition-transform ${
                        aiMode ? "left-2.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {aiMode && (
                  <button
                    type="button"
                    onClick={generateWithAi}
                    disabled={generating}
                    className="flex w-full items-center justify-center gap-1 rounded bg-purple-600 py-1 text-[6px] font-bold text-white disabled:opacity-60"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-2 w-2 animate-spin" />
                        Parsing scenes…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-2 w-2" />
                        Generate with AI
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Per-scene settings */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 px-2 py-1">
                <p className="text-[7px] font-bold">Video Settings · Per Scene</p>
              </div>
              <div className="max-h-[88px] space-y-1 overflow-y-auto p-1.5">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className="rounded border border-gray-200 bg-gray-50 p-1.5"
                  >
                    <div className="mb-0.5 flex items-center justify-between">
                      <span className="flex items-center gap-0.5 text-[6px] font-bold">
                        <Film className="h-2 w-2 text-pink-400" />
                        Scene {index + 1}
                      </span>
                      {scenes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScene(scene.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-2 w-2" />
                        </button>
                      )}
                    </div>
                    <p className="text-[5.5px] leading-snug text-gray-600">
                      {scene.action}
                    </p>
                    <p className="text-[5px] text-gray-400">{scene.environment}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addScene}
                className="flex w-full items-center justify-center gap-0.5 border-t border-gray-100 py-1 text-[6px] font-semibold text-purple-600"
              >
                <Plus className="h-2 w-2" />
                Add clip
              </button>
            </div>

            {stitched && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1">
                <p className="text-[6px] font-bold text-emerald-700">
                  ✓ {scenes.length} clips stitched → 15s social reel
                </p>
                <div className="mt-1 flex gap-0.5">
                  {scenes.map((scene) => (
                    <div
                      key={scene.id}
                      className="h-4 flex-1 rounded bg-gradient-to-br from-purple-400/40 to-blue-400/40"
                      title={scene.action}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
