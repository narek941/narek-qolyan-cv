"use client";

import { useMemo, useState } from "react";

type GitProfile = "work" | "personal";

interface ProfileConfig {
  id: GitProfile;
  label: string;
  name: string;
  email: string;
  sshKey: string;
  alias: string;
}

const PROFILES: ProfileConfig[] = [
  {
    id: "work",
    label: "work",
    name: "Narek Kolyan",
    email: "nqolyan@company.dev",
    sshKey: "id_ed25519_work",
    alias: "use-work",
  },
  {
    id: "personal",
    label: "personal",
    name: "Narek Kolyan",
    email: "nqolyan@gmail.com",
    sshKey: "id_ed25519_personal",
    alias: "use-personal",
  },
];

const TerminalChrome = ({ title }: { title: string }) => (
  <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#16161e] px-2 py-1">
    <span className="h-2 w-2 rounded-full bg-red-500/80" />
    <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
    <span className="h-2 w-2 rounded-full bg-green-500/80" />
    <span className="mx-auto font-mono text-[7px] text-white/45">{title}</span>
  </div>
);

const PromptLine = ({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) => (
  <p className={`font-mono text-[7px] leading-relaxed sm:text-[8px] ${className}`}>
    <span className="text-emerald-400">➜</span>{" "}
    <span className="text-cyan-300/90">~</span>{" "}
    <span className="text-white/85">{command}</span>
  </p>
);

/**
 * Interactive demo of use-multiple-gits — tap identities to switch git
 * user.name, user.email, and SSH key (mirrors use-work / use-personal).
 */
export const MultiGitDesktopPreview = () => {
  const [activeProfile, setActiveProfile] = useState<GitProfile>("work");
  const [lastCommand, setLastCommand] = useState("multiGit list");
  const active = PROFILES.find((profile) => profile.id === activeProfile)!;

  const switchProfile = (profileId: GitProfile) => {
    const profile = PROFILES.find((item) => item.id === profileId)!;
    setActiveProfile(profileId);
    setLastCommand(profile.alias);
  };

  const listOutput = useMemo(
    () =>
      PROFILES.map((profile) => {
        const marker = profile.id === activeProfile ? "●" : "○";
        const tone = profile.id === activeProfile ? "text-emerald-300" : "text-white/45";
        return (
          <p key={profile.id} className={`font-mono text-[6.5px] leading-relaxed sm:text-[7.5px] ${tone}`}>
            {marker} {profile.label.padEnd(9)} {profile.name} &lt;{profile.email}&gt;
          </p>
        );
      }),
    [activeProfile]
  );

  return (
    <div className="flex h-full w-full flex-col bg-[#0c0c12] text-white">
      <TerminalChrome title="Terminal — zsh" />
      <div
        data-lenis-prevent
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-2.5 sm:p-3"
      >
        <PromptLine command="npm install -g use-multiple-gits && multiGit setup" />
        <p className="font-mono text-[7px] text-white/40">added 1 package in 2.1s</p>

        <PromptLine command="multiGit list" className="mt-1" />
        <div className="mb-1 space-y-0.5 rounded border border-white/8 bg-black/30 px-2 py-1.5">
          {listOutput}
        </div>

        <div className="mb-1 flex flex-wrap gap-1.5">
          {PROFILES.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => switchProfile(profile.id)}
              className={`rounded-md border px-2 py-1 font-mono text-[7px] font-bold transition-colors ${
                activeProfile === profile.id
                  ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                  : "border-white/12 bg-white/[0.04] text-white/60 hover:border-white/25"
              }`}
            >
              {profile.alias}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLastCommand("multiGit add org --generate-ssh-key")}
            className="rounded-md border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[7px] text-white/55 hover:border-white/25"
          >
            multiGit add …
          </button>
        </div>

        <PromptLine command={lastCommand} />
        <div className="rounded border border-emerald-400/20 bg-emerald-500/[0.07] px-2 py-1.5 font-mono text-[7px] leading-relaxed sm:text-[8px]">
          <p className="text-emerald-300">✓ Active identity: {active.label}</p>
          <p className="text-white/75">user.name={active.name}</p>
          <p className="text-white/75">user.email={active.email}</p>
          <p className="text-cyan-300/85">identity.file=~/.ssh/{active.sshKey}</p>
        </div>

        <p className="mt-auto font-mono text-[6.5px] text-white/35">
          MIT · use-multiple-gits · shell aliases in ~/.zshrc
        </p>
      </div>
    </div>
  );
};
