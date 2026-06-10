"use client";

import { useState } from "react";
import {
  CheckCircle,
  FileText,
  LayoutDashboard,
  Store,
  Users,
} from "lucide-react";

type AdminView = "home" | "accounts" | "users";
type AnalyticsPeriod = "7d" | "30d" | "90d" | "ytd";

interface DealerRow {
  code: string;
  name: string;
  status: "ACTIVE" | "PENDING_APPROVAL" | "ON_HOLD";
}

const DEALERS: DealerRow[] = [
  { code: "DLR-0001", name: "Northline Cabinets", status: "ACTIVE" },
  { code: "DLR-0002", name: "Summit Woodworks", status: "ACTIVE" },
  { code: "DLR-0003", name: "Coastal Millwork", status: "PENDING_APPROVAL" },
];

const PERIOD_METRICS: Record<
  AnalyticsPeriod,
  { pipeline: string; approved: string; activeDealers: string }
> = {
  "7d": { pipeline: "$184K", approved: "$92K", activeDealers: "24" },
  "30d": { pipeline: "$612K", approved: "$318K", activeDealers: "24" },
  "90d": { pipeline: "$1.8M", approved: "$940K", activeDealers: "23" },
  ytd: { pipeline: "$4.2M", approved: "$2.1M", activeDealers: "24" },
};

const STATUS_STYLES: Record<DealerRow["status"], string> = {
  ACTIVE: "bg-[#e8f5e9] text-[#2e7d32]",
  PENDING_APPROVAL: "bg-[#e3f2fd] text-[#1565c0]",
  ON_HOLD: "bg-[#fff3e0] text-[#e65100]",
};

const NAV_ITEMS: { view: AdminView; icon: typeof LayoutDashboard; label: string }[] = [
  { view: "home", icon: LayoutDashboard, label: "Home" },
  { view: "accounts", icon: Store, label: "Accounts" },
  { view: "users", icon: Users, label: "Users" },
];

/**
 * Dealer portal admin UI — light paper surface,
 * orange accent KPIs, period tabs, accounts table with live status toggles.
 */
export const DealerPortalPreview = () => {
  const [activeView, setActiveView] = useState<AdminView>("accounts");
  const [period, setPeriod] = useState<AnalyticsPeriod>("30d");
  const [dealers, setDealers] = useState(DEALERS);

  const metrics = PERIOD_METRICS[period];
  const activeCount = dealers.filter((dealer) => dealer.status === "ACTIVE").length;

  const cycleStatus = (code: string) =>
    setDealers((rows) =>
      rows.map((row) => {
        if (row.code !== code) return row;
        const next: DealerRow["status"] =
          row.status === "ACTIVE"
            ? "ON_HOLD"
            : row.status === "ON_HOLD"
              ? "PENDING_APPROVAL"
              : "ACTIVE";
        return { ...row, status: next };
      })
    );

  return (
    <div className="flex h-full w-full bg-[#f3f3f3] text-[#1a1a1c]">
      {/* Sidebar — matches PrivateLayout / tokens.scss ink-900 */}
      <div className="flex w-[18%] flex-col gap-0.5 border-r border-[#2f2f36] bg-[#1a1a1c] p-1.5">
        <div className="mb-2 flex items-center gap-1 px-1 py-1">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-[#ce5400] text-[6px] font-bold text-white">
            DP
          </span>
          <span className="text-[6.5px] font-semibold text-[#d9d8d3]">Dealer Hub</span>
        </div>
        {NAV_ITEMS.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            type="button"
            onClick={() => setActiveView(view)}
            className={`flex items-center gap-1 rounded px-1.5 py-1 text-[7px] transition-colors ${
              activeView === view
                ? "bg-white/10 text-white"
                : "text-[#8c8c90] hover:bg-white/5 hover:text-[#d9d8d3]"
            }`}
          >
            <Icon className="h-2.5 w-2.5 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-2">
        {activeView === "home" && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[8px] font-semibold text-[#6b6b70]">Analytics</p>
              <div className="flex gap-0.5">
                {(["7d", "30d", "90d", "ytd"] as AnalyticsPeriod[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPeriod(option)}
                    className={`border-b-2 px-1.5 py-0.5 text-[7px] font-medium uppercase transition-colors ${
                      period === option
                        ? "border-[#ce5400] text-[#ce5400]"
                        : "border-transparent text-[#6b6b70] hover:text-[#1a1a1c]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                {
                  label: "Pipeline",
                  value: metrics.pipeline,
                  accent: true,
                  icon: <FileText className="h-2 w-2" />,
                },
                {
                  label: "Approved",
                  value: metrics.approved,
                  accent: false,
                  icon: <CheckCircle className="h-2 w-2 text-[#2e7d32]" />,
                },
                {
                  label: "Active dealers",
                  value: metrics.activeDealers,
                  accent: true,
                  icon: <Users className="h-2 w-2" />,
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-md border border-[#e2e2e2] bg-white p-1.5"
                >
                  <p className="text-[5.5px] font-bold uppercase tracking-wider text-[#6b6b70]">
                    {kpi.label}
                  </p>
                  <p
                    className={`text-[11px] font-bold leading-tight ${
                      kpi.accent ? "text-[#ce5400]" : "text-[#1a1a1c]"
                    }`}
                  >
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === "accounts" && (
          <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#e2e2e2] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e2e2] bg-[#ececec] px-2 py-1">
              <span className="text-[7px] font-medium text-[#6b6b70]">Search accounts…</span>
              <button
                type="button"
                className="rounded bg-[#ce5400] px-1.5 py-0.5 text-[6.5px] font-bold text-white hover:bg-[#a64400]"
              >
                + Add
              </button>
            </div>
            <div className="grid grid-cols-[0.9fr_1.4fr_auto] border-b border-[#e2e2e2] bg-[#ececec] px-2 py-1 text-[5.5px] font-bold uppercase tracking-wider text-[#6b6b70]">
              <span>Code</span>
              <span>Dealer</span>
              <span>Status</span>
            </div>
            {dealers.map((dealer) => (
              <div
                key={dealer.code}
                className="grid grid-cols-[0.9fr_1.4fr_auto] items-center border-b border-[#e2e2e2] px-2 py-1.5 text-[7px]"
              >
                <span className="font-mono text-[#6b6b70]">{dealer.code}</span>
                <span className="font-medium">{dealer.name}</span>
                <button
                  type="button"
                  onClick={() => cycleStatus(dealer.code)}
                  className={`rounded-full px-1.5 py-0.5 text-[6px] font-bold uppercase ${STATUS_STYLES[dealer.status]}`}
                >
                  {dealer.status.replace("_", " ")}
                </button>
              </div>
            ))}
            <p className="px-2 py-1 text-[6px] text-[#6b6b70]">
              {activeCount} active · tap status to cycle
            </p>
          </div>
        )}

        {activeView === "users" && (
          <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#e2e2e2] bg-white">
            <div className="grid grid-cols-3 border-b border-[#e2e2e2] bg-[#ececec] px-2 py-1 text-[5.5px] font-bold uppercase tracking-wider text-[#6b6b70]">
              <span>User</span>
              <span>Organization</span>
              <span>Role</span>
            </div>
            {[
              { email: "admin@test.com", org: "Manufacturer HQ", role: "Admin" },
              { email: "dealer@test.com", org: "Northline Cabinets", role: "Dealer" },
              { email: "manager@test.com", org: "Northline Cabinets", role: "Manager" },
            ].map((user) => (
              <div
                key={user.email}
                className="grid grid-cols-3 items-center border-b border-[#e2e2e2] px-2 py-1.5 text-[7px]"
              >
                <span className="truncate text-[#6b6b70]">{user.email}</span>
                <span className="truncate">{user.org}</span>
                <span
                  className={`w-fit rounded-full px-1.5 py-0.5 text-[6px] font-bold ${
                    user.role === "Admin"
                      ? "bg-[#e8f5e9] text-[#2e7d32]"
                      : user.role === "Dealer"
                        ? "bg-[#f3e5f5] text-[#7b1fa2]"
                        : "bg-[#e3f2fd] text-[#1565c0]"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
