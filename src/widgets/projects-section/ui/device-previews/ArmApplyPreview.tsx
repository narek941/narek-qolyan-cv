"use client";

import { useState } from "react";
import { Check, ExternalLink, Mail, SkipForward, VolumeX } from "lucide-react";

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  score: number;
  reason: string;
  letterPreview: string;
}

const JOB_MATCHES: JobMatch[] = [
  {
    id: "1",
    title: "Senior Full Stack Engineer",
    company: "Remote SaaS Co.",
    location: "Yerevan · Remote",
    score: 9,
    reason: "React + Node stack matches 6 yrs experience; Python bonus fits backend work.",
    letterPreview:
      "I'm excited about this role — at my last position I led a React/Node monorepo serving 100+ brand storefronts…",
  },
  {
    id: "2",
    title: "Backend Engineer (Python)",
    company: "FinTech Startup",
    location: "EU · Hybrid",
    score: 8,
    reason: "FastAPI + Postgres overlap; Gmail API integration experience from a prior bot project.",
    letterPreview:
      "Your stack mirrors projects I've shipped: FastAPI services, Postgres per-user state, and OAuth flows…",
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "E-commerce Platform",
    location: "Remote",
    score: 7,
    reason: "Strong React/TypeScript profile; Shopify headless experience is a plus for this team.",
    letterPreview:
      "I've built headless Shopify storefronts with optimized GraphQL queries and custom checkout flows…",
  },
];

const scoreColor = (score: number) =>
  score >= 9 ? "text-emerald-400" : score >= 7 ? "text-amber-400" : "text-white/50";

/**
 * ArmApply Telegram bot — from github.com/narek941/job-be.
 * Job match cards with LLM fit score, grounded cover letter, one-tap Gmail draft.
 */
export const ArmApplyPreview = () => {
  const [jobIndex, setJobIndex] = useState(0);
  const [gmailConnected, setGmailConnected] = useState(true);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());

  const job = JOB_MATCHES[jobIndex];
  const isSkipped = skippedIds.has(job.id);
  const isApplied = appliedId === job.id;

  const apply = () => {
    if (!gmailConnected) return;
    setAppliedId(job.id);
    window.setTimeout(() => setAppliedId(null), 2200);
  };

  const skip = () => {
    setSkippedIds((ids) => new Set(ids).add(job.id));
    setJobIndex((index) => (index + 1) % JOB_MATCHES.length);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0e1621] text-white">
      {/* Telegram header */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-[#17212b] px-2.5 py-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2aabee] text-[8px] font-black">
          A
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[8px] font-bold">Job Hunter</p>
          <p className="text-[6px] text-[#6d7f8f]">bot · online</p>
        </div>
        <button
          type="button"
          onClick={() => setGmailConnected((connected) => !connected)}
          className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[5.5px] font-bold ${
            gmailConnected
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-white/10 text-white/45"
          }`}
        >
          <Mail className="h-2 w-2" />
          {gmailConnected ? "Gmail" : "Connect"}
        </button>
      </div>

      <div
        data-lenis-prevent
        className="flex flex-1 flex-col gap-2 overflow-y-auto p-2"
      >
        {/* Bot intro */}
        <div className="max-w-[88%] self-start rounded-xl rounded-tl-sm bg-[#182533] px-2 py-1.5">
          <p className="text-[6.5px] leading-relaxed text-white/85">
            CV parsed ✓ Daily scan found <strong>{JOB_MATCHES.length}</strong> matches.
            Tap <strong>Apply</strong> to drop a Gmail draft with your CV attached.
          </p>
        </div>

        {/* Job card */}
        {!isSkipped && (
          <div className="max-w-[92%] self-start rounded-xl rounded-tl-sm border border-[#2aabee]/20 bg-[#182533] p-2">
            <div className="flex items-start justify-between gap-1">
              <div>
                <p className="text-[7.5px] font-bold leading-tight">{job.title}</p>
                <p className="text-[6px] text-[#6d7f8f]">
                  {job.company} · {job.location}
                </p>
              </div>
              <span className={`shrink-0 text-[8px] font-black ${scoreColor(job.score)}`}>
                {job.score}/10
              </span>
            </div>
            <p className="mt-1 text-[6px] leading-snug text-white/55">{job.reason}</p>
            <p className="mt-1.5 rounded bg-black/25 px-1.5 py-1 text-[5.5px] italic leading-snug text-white/45">
              {job.letterPreview}
            </p>

            <div className="mt-2 flex flex-wrap gap-1">
              <button
                type="button"
                onClick={apply}
                disabled={!gmailConnected}
                className="flex items-center gap-0.5 rounded-md bg-[#2aabee] px-2 py-0.5 text-[6px] font-bold text-white disabled:opacity-40"
              >
                <Check className="h-2 w-2" />
                Apply
              </button>
              <button
                type="button"
                onClick={skip}
                className="flex items-center gap-0.5 rounded-md bg-white/10 px-2 py-0.5 text-[6px] text-white/70"
              >
                <SkipForward className="h-2 w-2" />
                Skip
              </button>
              <button
                type="button"
                className="flex items-center gap-0.5 rounded-md bg-white/10 px-1.5 py-0.5 text-[6px] text-white/55"
              >
                <VolumeX className="h-2 w-2" />
                Mute
              </button>
              <button
                type="button"
                className="flex items-center gap-0.5 rounded-md bg-white/10 px-1.5 py-0.5 text-[6px] text-white/55"
              >
                <ExternalLink className="h-2 w-2" />
                Open
              </button>
            </div>
          </div>
        )}

        {/* Apply confirmation */}
        {isApplied && (
          <div className="max-w-[88%] self-start rounded-xl rounded-tl-sm bg-emerald-500/15 px-2 py-1.5 ring-1 ring-emerald-400/25">
            <p className="text-[6.5px] font-bold text-emerald-300">
              ✓ Gmail draft created
            </p>
            <p className="text-[6px] text-white/55">
              Cover letter + CV attached · review in your inbox
            </p>
          </div>
        )}

        {/* User reply bubble */}
        <div className="mt-auto max-w-[70%] self-end rounded-xl rounded-tr-sm bg-[#2b5278] px-2 py-1">
          <p className="text-[6.5px] text-white/90">/run</p>
        </div>
      </div>
    </div>
  );
};
