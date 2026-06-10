"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  LayoutDashboard,
  List,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

type AdminView = "analytics" | "accounts" | "alerts";

interface TickerRow {
  pair: string;
  price: string;
  change: number;
}

const TICKER: TickerRow[] = [
  { pair: "BTC/USDT", price: "67,842.10", change: 1.24 },
  { pair: "ETH/USDT", price: "3,521.55", change: -0.38 },
  { pair: "SOL/USDT", price: "142.80", change: 2.91 },
  { pair: "XRP/USDT", price: "0.5821", change: 0.44 },
];

const ACCOUNTS = [
  { id: "ACC-1042", exchange: "Binance", capital: "128,450.22", perf: "+12.4%" },
  { id: "ACC-2087", exchange: "Bybit", capital: "54,210.08", perf: "+3.1%" },
  { id: "ACC-3110", exchange: "OKX", capital: "91,003.55", perf: "-1.8%" },
];

const NAV: { view: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { view: "analytics", label: "Dashboard", icon: LayoutDashboard },
  { view: "accounts", label: "Accounts", icon: List },
  { view: "alerts", label: "Alerts", icon: Bell },
];

const TEAL = "#0097a7";

/**
 * Crypto exchange admin panel — from github.com/narek941/Crypto.
 * Sidebar nav, KPI bricks, area charts, live pair ticker, accounts table.
 */
export const CryptoAdminPreview = () => {
  const [activeView, setActiveView] = useState<AdminView>("analytics");
  const [ticker, setTicker] = useState(TICKER);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTicker((rows) =>
        rows.map((row) => {
          const delta = (Math.random() - 0.5) * 0.6;
          const change = Number((row.change + delta).toFixed(2));
          return { ...row, change };
        })
      );
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full bg-[#faffff] text-[#212121]">
      {/* Sidebar */}
      <div
        className="flex w-[20%] flex-col gap-0.5 border-r p-1.5"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: "#d6d6d6" }}
      >
        <div className="mb-1.5 px-1">
          <p className="text-[7px] font-bold" style={{ color: TEAL }}>
            Crypto Admin
          </p>
          <p className="text-[5px] text-[#212121]/50">Exchange analytics</p>
        </div>
        {NAV.map(({ view, label, icon: Icon }) => (
          <button
            key={view}
            type="button"
            onClick={() => setActiveView(view)}
            className={`flex items-center gap-1 rounded px-1.5 py-1 text-[6.5px] transition-colors ${
              activeView === view
                ? "bg-[#0097a7]/15 font-semibold text-[#0097a7]"
                : "text-[#212121]/60 hover:bg-white/80"
            }`}
          >
            <Icon className="h-2.5 w-2.5 shrink-0" />
            {label}
          </button>
        ))}
        <button
          type="button"
          className="mt-auto flex items-center gap-1 rounded px-1.5 py-1 text-[6px] text-[#212121]/50"
        >
          <Users className="h-2 w-2" />
          Users
        </button>
      </div>

      <div
        data-lenis-prevent
        className="flex flex-1 flex-col overflow-y-auto p-2"
      >
        {/* Live ticker */}
        <div className="mb-1.5 flex gap-2 overflow-x-auto border-b border-[#d6d6d6]/60 pb-1">
          {ticker.map((row) => (
            <div key={row.pair} className="flex shrink-0 items-center gap-1 text-[5.5px]">
              <span className="font-semibold">{row.pair}</span>
              <span className="font-mono text-[#212121]/75">{row.price}</span>
              <span
                className={`flex items-center font-bold ${
                  row.change >= 0 ? "text-emerald-600" : "text-red-700"
                }`}
              >
                {row.change >= 0 ? (
                  <TrendingUp className="h-2 w-2" />
                ) : (
                  <TrendingDown className="h-2 w-2" />
                )}
                {row.change >= 0 ? "+" : ""}
                {row.change}%
              </span>
            </div>
          ))}
        </div>

        {activeView === "analytics" && (
          <>
            <div className="mb-1.5 grid grid-cols-3 gap-1">
              {[
                { label: "Seed Capital", value: "100,000.00" },
                { label: "Performance", value: "+8.42%" },
                { label: "Current Capital", value: "128,450.22", tall: true },
                { label: "Open Profit", value: "4,210.55" },
                { label: "Earned Capital", value: "28,450.22" },
              ].map((brick) => (
                <div
                  key={brick.label}
                  className={`rounded-md border border-[#d6d6d6]/50 bg-white/90 p-1.5 shadow-sm ${
                    "tall" in brick && brick.tall ? "row-span-2" : ""
                  }`}
                >
                  <p className="text-[5px] font-bold uppercase tracking-wider text-[#212121]/45">
                    {brick.label}
                  </p>
                  <p className="text-[9px] font-bold leading-tight" style={{ color: TEAL }}>
                    {brick.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Area chart mock */}
            <div className="rounded-md border border-[#d6d6d6]/50 bg-white p-1.5">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[6.5px] font-bold">Account Capital Chart</p>
                <Activity className="h-2.5 w-2.5 text-[#0097a7]/60" />
              </div>
              <svg viewBox="0 0 200 48" className="h-12 w-full">
                <defs>
                  <linearGradient id="cryptoArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0097a7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0097a7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,40 L20,36 L40,32 L60,28 L80,30 L100,22 L120,18 L140,20 L160,12 L180,8 L200,6 L200,48 L0,48 Z"
                  fill="url(#cryptoArea)"
                />
                <path
                  d="M0,40 L20,36 L40,32 L60,28 L80,30 L100,22 L120,18 L140,20 L160,12 L180,8 L200,6"
                  fill="none"
                  stroke="#0097a7"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="mt-1 flex justify-center gap-2">
                {["BTC 42%", "ETH 28%", "SOL 18%"].map((slice) => (
                  <span key={slice} className="text-[5px] text-[#212121]/55">
                    {slice}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeView === "accounts" && (
          <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#d6d6d6]/50 bg-white shadow-sm">
            <div className="border-b border-[#d6d6d6]/50 bg-[#faffff] px-2 py-1 text-[6.5px] font-bold">
              Trading accounts
            </div>
            <div className="grid grid-cols-[0.8fr_0.7fr_1fr_0.6fr] border-b border-[#d6d6d6]/40 bg-white/80 px-2 py-0.5 text-[5px] font-bold uppercase tracking-wider text-[#212121]/45">
              <span>ID</span>
              <span>Exchange</span>
              <span>Capital</span>
              <span>P&amp;L</span>
            </div>
            {ACCOUNTS.map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => setSelectedAccount(account.id)}
                className={`grid grid-cols-[0.8fr_0.7fr_1fr_0.6fr] items-center border-b border-[#d6d6d6]/30 px-2 py-1 text-left text-[6px] ${
                  selectedAccount === account.id ? "bg-[#0097a7]/8" : ""
                }`}
              >
                <span className="font-mono text-[#212121]/55">{account.id}</span>
                <span>{account.exchange}</span>
                <span className="font-mono">{account.capital}</span>
                <span
                  className={
                    account.perf.startsWith("+")
                      ? "font-bold text-emerald-600"
                      : "font-bold text-red-700"
                  }
                >
                  {account.perf}
                </span>
              </button>
            ))}
          </div>
        )}

        {activeView === "alerts" && (
          <div className="space-y-1">
            {[
              { msg: "BTC/USDT crossed +5% daily threshold", time: "2m ago" },
              { msg: "ACC-3110 drawdown alert triggered", time: "18m ago" },
              { msg: "New trade pair SOL/USDT added", time: "1h ago" },
            ].map((alert) => (
              <div
                key={alert.msg}
                className="flex items-start gap-1 rounded border border-[#d6d6d6]/50 bg-white px-2 py-1"
              >
                <Bell className="mt-0.5 h-2 w-2 shrink-0 text-[#0097a7]" />
                <div>
                  <p className="text-[6px] leading-snug">{alert.msg}</p>
                  <p className="text-[5px] text-[#212121]/40">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
