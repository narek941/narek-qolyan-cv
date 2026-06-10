"use client";

import { useState } from "react";
import {
  Download,
  FolderArchive,
  Mail,
  PieChart,
  Plus,
  Search,
} from "lucide-react";

type AdminView = "segments" | "templates" | "providers";

interface SegmentRow {
  id: string;
  name: string;
  type: "dynamic" | "static";
  status: "active" | "draft" | "archived";
  users: number;
  updated: string;
}

const SEGMENTS: SegmentRow[] = [
  {
    id: "seg-a1b2",
    name: "High-value returning users",
    type: "dynamic",
    status: "active",
    users: 12840,
    updated: "2025-11-18",
  },
  {
    id: "seg-c3d4",
    name: "Churn risk — 30 days inactive",
    type: "dynamic",
    status: "active",
    users: 3921,
    updated: "2025-11-17",
  },
  {
    id: "seg-e5f6",
    name: "VIP cohort Q4",
    type: "static",
    status: "draft",
    users: 0,
    updated: "2025-11-15",
  },
];

const STATUS_STYLES: Record<SegmentRow["status"], string> = {
  active: "bg-[#f6ffed] text-[#52c41a] border-[#b7eb8f]",
  draft: "bg-[#fffbe6] text-[#faad14] border-[#ffe58f]",
  archived: "bg-[#f5f5f5] text-[#8c8c8c] border-[#d9d9d9]",
};

const PRIMARY = "#1677FF";

/**
 * Service admin panel — from service_admin_panel zip.
 * Ant Design layout: segmentation table, communications submenu, filters.
 */
export const ServiceAdminPreview = () => {
  const [activeView, setActiveView] = useState<AdminView>("segments");
  const [search, setSearch] = useState("");
  const [commOpen, setCommOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = SEGMENTS.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-white text-[#000000E0]">
      {/* Ant Design sidebar */}
      <aside className="flex w-[22%] flex-col border-r border-[#f0f0f0] bg-[#fafafa]">
        <div className="flex items-center gap-1 border-b border-[#f0f0f0] px-2 py-1.5">
          <span
            className="flex h-4 w-4 items-center justify-center rounded text-[6px] font-black text-white"
            style={{ background: PRIMARY }}
          >
            SA
          </span>
          <span className="text-[7px] font-semibold text-[#1f1f1f]">Service Admin</span>
        </div>
        <nav className="flex-1 p-1">
          <button
            type="button"
            onClick={() => setActiveView("segments")}
            className={`mb-0.5 flex w-full items-center gap-1 rounded px-1.5 py-1 text-[6.5px] ${
              activeView === "segments"
                ? "bg-[#e6f7ff] font-semibold text-[#1677ff]"
                : "text-[#1f1f1f] hover:bg-white"
            }`}
          >
            <PieChart className="h-2.5 w-2.5" />
            Segmentation
          </button>
          <button
            type="button"
            onClick={() => setCommOpen((open) => !open)}
            className="flex w-full items-center gap-1 rounded px-1.5 py-1 text-[6.5px] text-[#1f1f1f] hover:bg-white"
          >
            <Mail className="h-2.5 w-2.5" />
            Communications
          </button>
          {commOpen && (
            <div className="ml-3 space-y-0.5">
              <button
                type="button"
                onClick={() => setActiveView("templates")}
                className={`block w-full rounded px-1.5 py-0.5 text-left text-[6px] ${
                  activeView === "templates"
                    ? "font-semibold text-[#1677ff]"
                    : "text-[#8c8c8c]"
                }`}
              >
                Templates
              </button>
              <button
                type="button"
                onClick={() => setActiveView("providers")}
                className={`block w-full rounded px-1.5 py-0.5 text-left text-[6px] ${
                  activeView === "providers"
                    ? "font-semibold text-[#1677ff]"
                    : "text-[#8c8c8c]"
                }`}
              >
                Providers
              </button>
            </div>
          )}
        </nav>
        <div className="border-t border-[#f0f0f0] px-2 py-1 text-[5.5px] text-[#8c8c8c]">
          admin@company.dev
        </div>
      </aside>

      <div
        data-lenis-prevent
        className="flex flex-1 flex-col overflow-hidden"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-2 py-1">
          <p className="text-[8px] font-semibold text-[rgba(0,0,0,0.88)]">
            {activeView === "segments"
              ? "Segmentation"
              : activeView === "templates"
                ? "Templates"
                : "Providers"}
          </p>
          {activeView === "segments" && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 rounded border border-[#d9d9d9] bg-white px-1 py-0.5">
                <Search className="h-2 w-2 text-[#8c8c8c]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search…"
                  className="w-14 bg-transparent text-[6px] outline-none"
                />
              </div>
              <button
                type="button"
                className="rounded border border-[#d9d9d9] px-1 py-0.5 text-[6px] text-[#1f1f1f]"
              >
                <FolderArchive className="inline h-2 w-2" />
              </button>
              <button
                type="button"
                className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[6px] font-semibold text-white"
                style={{ background: PRIMARY }}
              >
                <Plus className="h-2 w-2" />
                Add
              </button>
            </div>
          )}
        </div>

        {activeView === "segments" && (
          <div className="flex flex-1 flex-col overflow-hidden p-1.5">
            <div className="flex-1 overflow-hidden rounded border border-[#f0f0f0]">
              <div className="grid grid-cols-[1.2fr_0.6fr_0.5fr_0.5fr_0.6fr] border-b border-[#f0f0f0] bg-[#fafafa] px-1.5 py-0.5 text-[5px] font-semibold uppercase tracking-wider text-[#8c8c8c]">
                <span>Name</span>
                <span>Type</span>
                <span>Status</span>
                <span>Users</span>
                <span>Updated</span>
              </div>
              {filtered.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setSelectedId(row.id)}
                  className={`grid w-full grid-cols-[1.2fr_0.6fr_0.5fr_0.5fr_0.6fr] items-center border-b border-[#f0f0f0] px-1.5 py-1 text-left text-[6px] hover:bg-[#fafafa] ${
                    selectedId === row.id ? "bg-[#e6f7ff]/60" : ""
                  }`}
                >
                  <span className="truncate font-medium text-[#1677ff]">{row.name}</span>
                  <span className="text-[#8c8c8c]">
                    {row.type === "dynamic" ? "Dynamic" : "Static"}
                  </span>
                  <span
                    className={`w-fit rounded border px-1 py-px text-[5px] font-medium capitalize ${STATUS_STYLES[row.status]}`}
                  >
                    {row.status}
                  </span>
                  <span className="font-mono">{row.users.toLocaleString()}</span>
                  <span className="text-[#8c8c8c]">{row.updated}</span>
                </button>
              ))}
            </div>
            {selectedId && (
              <div className="mt-1 rounded border border-[#d9d9d9] bg-[#f5f7fb] p-1.5">
                <p className="text-[6px] font-semibold">Condition builder</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-0.5 text-[5.5px]">
                  <span className="rounded border border-[#d9d9d9] bg-white px-1 py-0.5">
                    AND
                  </span>
                  <span className="rounded border border-[#d9d9d9] bg-white px-1 py-0.5">
                    last_login &gt; 30d
                  </span>
                  <span className="rounded border border-[#d9d9d9] bg-white px-1 py-0.5">
                    country = EU
                  </span>
                  <button
                    type="button"
                    className="rounded px-1 py-0.5 text-[#1677ff]"
                  >
                    + filter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === "templates" && (
          <div className="flex flex-1 flex-col gap-1 p-2">
            {["Welcome email", "Push — bonus reminder", "SMS — verification"].map(
              (template) => (
                <div
                  key={template}
                  className="flex items-center justify-between rounded border border-[#f0f0f0] px-2 py-1"
                >
                  <span className="text-[6.5px] font-medium">{template}</span>
                  <span className="rounded bg-[#f6ffed] px-1 py-px text-[5px] text-[#52c41a]">
                    Active
                  </span>
                </div>
              )
            )}
          </div>
        )}

        {activeView === "providers" && (
          <div className="flex flex-1 flex-col gap-1 p-2">
            {["Email — SendGrid", "Push — Firebase", "SMS — Twilio"].map((provider) => (
              <div
                key={provider}
                className="flex items-center justify-between rounded border border-[#f0f0f0] px-2 py-1"
              >
                <span className="text-[6.5px]">{provider}</span>
                <button type="button" className="text-[5.5px] text-[#1677ff]">
                  Configure
                </button>
              </div>
            ))}
          </div>
        )}

        {activeView === "segments" && (
          <div className="flex justify-end gap-1 border-t border-[#f0f0f0] px-2 py-1">
            <button
              type="button"
              className="flex items-center gap-0.5 text-[5.5px] text-[#1677ff]"
            >
              <Download className="h-2 w-2" />
              Export CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
