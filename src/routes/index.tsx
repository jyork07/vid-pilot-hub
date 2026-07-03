import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  ClipboardCopy,
  Cpu,
  Download,
  Eye,
  Film,
  Gauge,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Rocket,
  Settings2,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  Wand2,
  X,
  Youtube,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "TrendClip — Dashboard" },
      { name: "description", content: "Live control room for TrendClip: jobs, autopilot, video library and settings." },
    ],
  }),
});

type TabId = "dashboard" | "newjob" | "jobs" | "library" | "autopilot" | "settings" | "auth";

type JobState = "COMPLETED" | "RUNNING" | "FAILED" | "CREATED" | "UPLOADING" | "PROCESSING";

interface Job {
  id: string;
  state: JobState;
  stage: string;
  progress: number;
  updated: string;
  title: string;
  source: string;
}

interface LibraryItem {
  id: string;
  title: string;
  thumb: string;
  duration: string;
  sizeMb: number;
  createdAt: string;
  score: number;
  uploaded: boolean;
}

const NAV: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "newjob", label: "New Job", icon: Rocket },
  { id: "jobs", label: "Jobs", icon: ListChecks },
  { id: "library", label: "Library", icon: Film },
  { id: "autopilot", label: "Autopilot", icon: Bot },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "auth", label: "Auth", icon: KeyRound },
];

const SEED_JOBS: Job[] = [
  { id: "39287eb394744ec9b8bf9a09a31c8a8c", state: "COMPLETED", stage: "UPLOADING", progress: 100, updated: "03/07/2026, 19:54:53", title: "Cat plays piano — remix", source: "ytsearch:funny cats" },
  { id: "c9fa36c9d8c34276b86f4f326a12de91", state: "RUNNING", stage: "PROCESSING", progress: 45, updated: "03/07/2026, 19:43:29", title: "MrBeast highlight cut", source: "https://youtu.be/abc123" },
  { id: "7afbb3e74634473c84b30874632c2bfe", state: "CREATED", stage: "—", progress: 0, updated: "03/07/2026, 19:54:20", title: "AI product demo trend", source: "ytsearch:ai gadgets" },
  { id: "4f10afe0a5c444e49d0e6218964904d5", state: "UPLOADING", stage: "UPLOADING", progress: 90, updated: "03/07/2026, 18:48:03", title: "Street food Tokyo", source: "ytsearch:tokyo street food" },
  { id: "e23c2b137d8549f3956e3948c2eac92a", state: "FAILED", stage: "DOWNLOADING", progress: 20, updated: "03/07/2026, 19:08:19", title: "Failed: geo-blocked", source: "https://youtu.be/xyz" },
  { id: "cf5b1e211a00443f88b60a63a041e256", state: "COMPLETED", stage: "UPLOADING", progress: 100, updated: "03/07/2026, 18:15:28", title: "Gym motivation edit", source: "ytsearch:gym motivation" },
];

const SEED_LIBRARY: LibraryItem[] = [
  { id: "lib-1", title: "Cat plays piano — remix", thumb: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop", duration: "0:38", sizeMb: 7.2, createdAt: "03/07/2026", score: 92, uploaded: true },
  { id: "lib-2", title: "Gym motivation edit", thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop", duration: "0:52", sizeMb: 9.8, createdAt: "03/07/2026", score: 88, uploaded: true },
  { id: "lib-3", title: "Street food Tokyo", thumb: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop", duration: "0:44", sizeMb: 8.1, createdAt: "03/07/2026", score: 81, uploaded: false },
  { id: "lib-4", title: "AI product demo trend", thumb: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop", duration: "0:59", sizeMb: 11.4, createdAt: "02/07/2026", score: 77, uploaded: false },
  { id: "lib-5", title: "Sunset drone reel", thumb: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop", duration: "0:29", sizeMb: 5.6, createdAt: "01/07/2026", score: 74, uploaded: true },
  { id: "lib-6", title: "Puppy first swim", thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop", duration: "0:41", sizeMb: 6.9, createdAt: "30/06/2026", score: 69, uploaded: false },
];

function Dashboard() {
  const [tab, setTab] = useState<TabId>("dashboard");
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS);
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  // Simulate live progress on RUNNING/UPLOADING jobs
  useEffect(() => {
    const t = setInterval(() => {
      setJobs((prev) =>
        prev.map((j) => {
          if (j.state === "RUNNING" || j.state === "UPLOADING") {
            const next = Math.min(100, j.progress + Math.random() * 4);
            const done = next >= 100;
            return {
              ...j,
              progress: next,
              state: done ? ("COMPLETED" as JobState) : j.state,
              stage: done ? "UPLOADING" : j.stage,
              updated: new Date().toLocaleString("en-GB"),
            };
          }
          return j;
        }),
      );
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const stats = useMemo(() => {
    const total = jobs.length;
    const completed = jobs.filter((j) => j.state === "COMPLETED").length;
    const failed = jobs.filter((j) => j.state === "FAILED").length;
    const running = jobs.filter((j) => j.state === "RUNNING" || j.state === "UPLOADING" || j.state === "PROCESSING").length;
    const rate = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, failed, running, rate };
  }, [jobs]);

  const currentLabel = NAV.find((n) => n.id === tab)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r border-sidebar-border bg-sidebar px-3 py-4 gap-1">
        <div className="flex items-center gap-2 px-3 pb-4 mb-2 border-b border-sidebar-border">
          <div className="grid place-items-center h-8 w-8 rounded-md bg-gradient-brand shadow-glow">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div className="font-semibold tracking-tight">
            Trend<span className="text-primary">Clip</span>
          </div>
        </div>
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = tab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground font-medium shadow-glow"
                  : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </button>
          );
        })}
        <div className="mt-auto rounded-md border border-sidebar-border bg-card/60 p-3 text-xs">
          <div className="flex items-center gap-1.5 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Worker online
          </div>
          <div className="mt-1 text-muted-foreground text-mono">v0.7.0 · phase 8</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile brand */}
            <div className="md:hidden flex items-center gap-2">
              <div className="grid place-items-center h-7 w-7 rounded-md bg-gradient-brand">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold">TrendClip</span>
            </div>
            <h1 className="text-sm font-semibold text-muted-foreground hidden md:block">{currentLabel}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success" /> online</span>
            <span className="text-mono hidden sm:inline">{clock}</span>
            <button
              onClick={() => showToast("Refreshed")}
              className="rounded-md border border-border p-1.5 hover:bg-muted"
              aria-label="Refresh"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Mobile tabs strip */}
        <nav className="md:hidden flex overflow-x-auto border-b border-border px-2 gap-1 py-2">
          {NAV.map((n) => {
            const active = tab === n.id;
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {n.label}
              </button>
            );
          })}
        </nav>

        <section className="flex-1 overflow-auto p-4 md:p-6">
          {tab === "dashboard" && <DashboardTab stats={stats} jobs={jobs} onGo={setTab} />}
          {tab === "newjob" && <NewJobTab onLaunch={(j) => { setJobs((p) => [j, ...p]); showToast("Job queued"); setTab("jobs"); }} />}
          {tab === "jobs" && <JobsTab jobs={jobs} onCancel={(id) => { setJobs((p) => p.map(j => j.id === id ? { ...j, state: "FAILED" as JobState } : j)); showToast("Job cancelled"); }} />}
          {tab === "library" && <LibraryTab onToast={showToast} />}
          {tab === "autopilot" && <AutopilotTab onToast={showToast} />}
          {tab === "settings" && <SettingsTab onToast={showToast} />}
          {tab === "auth" && <AuthTab onToast={showToast} />}
        </section>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-lg border border-border bg-card px-4 py-2.5 text-sm shadow-glow z-50 animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable UI atoms ---------- */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-card ${className}`}>{children}</div>;
}

function CardHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</h3>
      {action}
    </div>
  );
}

function Stat({ label, value, sub, tone = "default", icon: Icon }: { label: string; value: React.ReactNode; sub?: string; tone?: "default" | "success" | "danger" | "warn"; icon: React.ComponentType<{ className?: string }> }) {
  const toneColor =
    tone === "success" ? "text-success" : tone === "danger" ? "text-destructive" : tone === "warn" ? "text-warning" : "text-foreground";
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
          <div className={`mt-1 text-2xl font-bold ${toneColor}`}>{value}</div>
          {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
        </div>
        <div className="grid place-items-center h-9 w-9 rounded-md bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}

function Badge({ state }: { state: JobState }) {
  const map: Record<JobState, string> = {
    COMPLETED: "bg-success/15 text-success border-success/30",
    RUNNING: "bg-warning/15 text-warning border-warning/30",
    UPLOADING: "bg-warning/15 text-warning border-warning/30",
    PROCESSING: "bg-warning/15 text-warning border-warning/30",
    FAILED: "bg-destructive/15 text-destructive border-destructive/30",
    CREATED: "bg-muted text-muted-foreground border-border",
  };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${map[state]}`}>{state}</span>;
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div className="h-full bg-gradient-progress transition-all duration-500" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

function Button({ children, variant = "primary", size = "md", onClick, className = "", type = "button" }: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
    secondary: "bg-secondary text-secondary-foreground hover:bg-muted border border-border",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-muted text-foreground",
  }[variant];
  const s = size === "sm" ? "h-7 px-2.5 text-xs" : "h-9 px-3.5 text-sm";
  return (
    <button type={type} onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-md font-medium transition-colors ${v} ${s} ${className}`}>
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground font-medium block mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full h-9 rounded-md border border-border bg-input px-3 text-sm outline-none focus:border-primary transition-colors ${props.className ?? ""}`} />;
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full h-9 rounded-md border border-border bg-input px-2 text-sm outline-none focus:border-primary ${props.className ?? ""}`} />;
}
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-card/60 px-3 py-2 cursor-pointer">
      <span className="text-sm">{label}</span>
      <span
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
      </span>
    </label>
  );
}

/* ---------- Tabs ---------- */

function DashboardTab({ stats, jobs, onGo }: { stats: { total: number; completed: number; failed: number; running: number; rate: number }; jobs: Job[]; onGo: (t: TabId) => void }) {
  const recent = jobs.slice(0, 5);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Jobs" value={stats.total} sub="all time" icon={Activity} />
        <Stat label="Completed" value={stats.completed} tone="success" sub={`success rate ${stats.rate}%`} icon={CheckCircle2} />
        <Stat label="Running" value={stats.running} tone="warn" sub="in flight" icon={Radio} />
        <Stat label="Failed" value={stats.failed} tone="danger" sub="visible in Jobs" icon={X} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHead title="Recent Jobs" action={<Button variant="ghost" size="sm" onClick={() => onGo("jobs")}>View all →</Button>} />
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-4 font-semibold">Job</th>
                  <th className="text-left py-2.5 px-4 font-semibold">State</th>
                  <th className="text-left py-2.5 px-4 font-semibold hidden md:table-cell">Stage</th>
                  <th className="text-left py-2.5 px-4 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((j) => (
                  <tr key={j.id} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="py-2.5 px-4">
                      <div className="text-sm">{j.title}</div>
                      <div className="text-mono text-[10px] text-muted-foreground">{j.id.slice(0, 22)}…</div>
                    </td>
                    <td className="px-4"><Badge state={j.state} /></td>
                    <td className="px-4 text-xs text-muted-foreground hidden md:table-cell">{j.stage}</td>
                    <td className="px-4 text-xs text-muted-foreground">{j.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="System Health" />
          <div className="p-4 space-y-3 text-sm">
            {[
              { name: "ffmpeg", ok: true },
              { name: "yt-dlp", ok: true },
              { name: "ollama", ok: true },
              { name: "youtube api", ok: true },
              { name: "cron worker", ok: true },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-muted-foreground capitalize">{s.name}</span>
                <span className={`text-xs font-semibold ${s.ok ? "text-success" : "text-destructive"}`}>
                  {s.ok ? "● healthy" : "● down"}
                </span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground">Ollama model</span>
              <span className="text-mono text-xs">llama3.1:8b</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 bg-gradient-brand text-white overflow-hidden relative">
          <div className="absolute right-4 top-4 opacity-20"><Sparkles className="h-24 w-24" /></div>
          <div className="text-xs uppercase tracking-wider opacity-80">Autopilot</div>
          <h4 className="mt-1 text-xl font-bold">Discover, score, upload — hands-off.</h4>
          <p className="mt-1 text-sm opacity-90 max-w-md">Let TrendClip crawl trending shorts, rank by engagement, and auto-upload the top scorers to your channels.</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => onGo("autopilot")} className="rounded-md bg-white/15 hover:bg-white/25 px-3.5 h-9 text-sm font-medium border border-white/20 backdrop-blur">Open Autopilot</button>
            <button onClick={() => onGo("newjob")} className="rounded-md bg-white text-primary px-3.5 h-9 text-sm font-semibold">New Job</button>
          </div>
        </Card>

        <Card>
          <CardHead title="Quick Actions" />
          <div className="p-4 grid grid-cols-2 gap-2">
            {[
              { label: "New Job", icon: Plus, go: "newjob" as TabId },
              { label: "Library", icon: Film, go: "library" as TabId },
              { label: "Autopilot", icon: Bot, go: "autopilot" as TabId },
              { label: "Settings", icon: Settings2, go: "settings" as TabId },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => onGo(a.go)}
                className="flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-3 text-sm hover:bg-muted transition-colors"
              >
                <a.icon className="h-4 w-4 text-primary" />
                {a.label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function NewJobTab({ onLaunch }: { onLaunch: (j: Job) => void }) {
  const [source, setSource] = useState("");
  const [max, setMax] = useState("3");
  const [subs, setSubs] = useState(false);
  const [stt, setStt] = useState(false);
  const [dry, setDry] = useState(false);

  const submit = () => {
    if (!source.trim()) return;
    const id = crypto.randomUUID().replace(/-/g, "");
    onLaunch({
      id,
      state: "RUNNING",
      stage: "DOWNLOADING",
      progress: 5,
      updated: new Date().toLocaleString("en-GB"),
      title: source.slice(0, 60),
      source,
    });
    setSource("");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHead title="Create a new trend job" />
        <div className="p-5 space-y-4">
          <Field label="Source">
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="YouTube URL or search query (e.g. funny cats short)"
            />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Max results">
              <Select value={max} onChange={(e) => setMax(e.target.value)}>
                <option>1</option><option>3</option><option>5</option><option>10</option>
              </Select>
            </Field>
            <Field label="Output preset">
              <Select>
                <option>Vertical 9:16 · 1080×1920</option>
                <option>Square 1:1 · 1080×1080</option>
                <option>Horizontal 16:9 · 1920×1080</option>
              </Select>
            </Field>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <Toggle checked={subs} onChange={setSubs} label="Burn subtitles" />
            <Toggle checked={stt} onChange={setStt} label="STT transcription" />
            <Toggle checked={dry} onChange={setDry} label="Dry run" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={submit}><Rocket className="h-4 w-4" /> Launch Pipeline</Button>
            <Button variant="secondary" onClick={() => setSource("")}>Clear</Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHead title="Pipeline stages" />
        <ol className="p-5 space-y-3 text-sm">
          {["Discover", "Download", "Process (9:16 crop)", "AI metadata (Ollama)", "Thumbnail", "Upload to YouTube"].map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="grid place-items-center h-6 w-6 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function JobsTab({ jobs, onCancel }: { jobs: Job[]; onCancel: (id: string) => void }) {
  const [filter, setFilter] = useState<"" | JobState>("");
  const filtered = jobs.filter((j) => (filter ? j.state === filter : true));
  const filters: { key: "" | JobState; label: string }[] = [
    { key: "", label: "All" },
    { key: "RUNNING", label: "Running" },
    { key: "COMPLETED", label: "Done" },
    { key: "FAILED", label: "Failed" },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.key || "all"}
              onClick={() => setFilter(f.key)}
              className={`rounded-md px-3 h-7 text-xs font-medium ${filter === f.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">{filtered.length} job{filtered.length !== 1 ? "s" : ""}</div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/30">
            <tr>
              <th className="text-left py-2.5 px-4">Job</th>
              <th className="text-left py-2.5 px-4">State</th>
              <th className="text-left py-2.5 px-4 hidden md:table-cell">Stage</th>
              <th className="text-left py-2.5 px-4">Progress</th>
              <th className="text-left py-2.5 px-4 hidden lg:table-cell">Updated</th>
              <th className="text-right py-2.5 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.id} className="border-t border-border hover:bg-muted/30">
                <td className="py-3 px-4">
                  <div className="font-medium">{j.title}</div>
                  <div className="text-mono text-[10px] text-muted-foreground">{j.id}</div>
                </td>
                <td className="px-4"><Badge state={j.state} /></td>
                <td className="px-4 text-xs text-muted-foreground hidden md:table-cell">{j.stage}</td>
                <td className="px-4 min-w-[140px]">
                  <div className="text-mono text-[10px] text-muted-foreground mb-1">{Math.round(j.progress)}%</div>
                  <Progress value={j.progress} />
                </td>
                <td className="px-4 text-xs text-muted-foreground hidden lg:table-cell">{j.updated}</td>
                <td className="px-4">
                  <div className="flex justify-end gap-1.5">
                    <Button variant="secondary" size="sm">Logs</Button>
                    {(j.state === "RUNNING" || j.state === "UPLOADING" || j.state === "PROCESSING") && (
                      <Button variant="danger" size="sm" onClick={() => onCancel(j.id)}><X className="h-3 w-3" /></Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">No jobs to show.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function LibraryTab({ onToast }: { onToast: (s: string) => void }) {
  const [items, setItems] = useState<LibraryItem[]>(SEED_LIBRARY);
  const [sort, setSort] = useState<"date" | "score" | "size">("date");
  const sorted = useMemo(() => {
    const arr = [...items];
    if (sort === "score") arr.sort((a, b) => b.score - a.score);
    if (sort === "size") arr.sort((a, b) => b.sizeMb - a.sizeMb);
    return arr;
  }, [items, sort]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{items.length} rendered shorts · local output folder</div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted-foreground">Sort</span>
          <Select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="w-36">
            <option value="date">Newest</option>
            <option value="score">Score</option>
            <option value="size">File size</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((v) => (
          <Card key={v.id} className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="relative aspect-[9/16] bg-muted overflow-hidden">
              <img src={v.thumb} alt={v.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className="rounded-md bg-black/60 backdrop-blur px-1.5 py-0.5 text-[10px] text-white text-mono">{v.duration}</span>
                <span className="rounded-md bg-primary/90 text-white px-1.5 py-0.5 text-[10px] font-semibold">★ {v.score}</span>
              </div>
              {v.uploaded && (
                <span className="absolute top-2 right-2 rounded-full bg-success/90 text-success-foreground px-1.5 py-0.5 text-[10px] font-semibold flex items-center gap-1"><Youtube className="h-3 w-3" /> Live</span>
              )}
              <button className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-white/95 text-primary shadow-glow">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </button>
            </div>
            <div className="p-3 space-y-2">
              <div className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{v.title}</div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{v.createdAt}</span>
                <span className="text-mono">{v.sizeMb.toFixed(1)} MB</span>
              </div>
              <div className="flex gap-1.5 pt-1">
                <Button variant="secondary" size="sm" onClick={() => onToast("Opening local file")}><Play className="h-3 w-3" /> Open</Button>
                <Button variant="secondary" size="sm" onClick={() => onToast("Link copied")}><ClipboardCopy className="h-3 w-3" /></Button>
                <Button variant="secondary" size="sm" onClick={() => onToast("Download started")}><Download className="h-3 w-3" /></Button>
                <button
                  onClick={() => { setItems((p) => p.filter((x) => x.id !== v.id)); onToast("Removed"); }}
                  className="ml-auto grid place-items-center h-7 w-7 rounded-md hover:bg-destructive/15 text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AutopilotTab({ onToast }: { onToast: (s: string) => void }) {
  const [enabled, setEnabled] = useState(true);
  const [rules, setRules] = useState([
    { id: 1, query: "funny cats shorts", minViews: 100000, maxAgeDays: 7, maxPerRun: 3, active: true },
    { id: 2, query: "ai gadgets trending", minViews: 50000, maxAgeDays: 3, maxPerRun: 2, active: true },
    { id: 3, query: "gym motivation", minViews: 200000, maxAgeDays: 14, maxPerRun: 2, active: false },
  ]);
  const [candidates] = useState([
    { title: "This cat's reaction is priceless", views: 1_240_000, engage: 8.4, score: 94, thumb: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" },
    { title: "AI robot vacuum vs sock", views: 890_000, engage: 7.1, score: 88, thumb: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400" },
    { title: "5AM gym transformation", views: 620_000, engage: 6.8, score: 82, thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
    { title: "Tokyo late night ramen", views: 450_000, engage: 5.9, score: 76, thumb: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
  ]);

  return (
    <div className="space-y-4">
      <Card className="p-5 bg-gradient-brand text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">Autopilot Engine</div>
          <h3 className="mt-1 text-xl font-bold">Smart discovery · scoring · auto-upload</h3>
          <p className="mt-1 text-sm opacity-90 max-w-xl">Ollama ranks candidates by engagement, freshness and topic fit. Top scorers are rendered and pushed to your connected channels automatically.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{enabled ? "Running" : "Paused"}</span>
          <button
            onClick={() => { setEnabled(!enabled); onToast(!enabled ? "Autopilot resumed" : "Autopilot paused"); }}
            className={`relative inline-flex h-7 w-12 rounded-full transition-colors ${enabled ? "bg-white/30" : "bg-black/30"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHead title="Discovery Rules" action={<Button size="sm" onClick={() => setRules((p) => [...p, { id: Date.now(), query: "new trend", minViews: 50000, maxAgeDays: 7, maxPerRun: 2, active: true }])}><Plus className="h-3.5 w-3.5" /> Add rule</Button>} />
            <div className="p-4 space-y-2">
              {rules.map((r) => (
                <div key={r.id} className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto_auto_auto] items-center rounded-md border border-border bg-card/50 p-3">
                  <input defaultValue={r.query} className="h-8 rounded-md border border-border bg-input px-2.5 text-sm" />
                  <div className="text-xs text-muted-foreground text-mono">≥ {r.minViews.toLocaleString()} views</div>
                  <div className="text-xs text-muted-foreground text-mono">≤ {r.maxAgeDays}d old</div>
                  <div className="text-xs text-muted-foreground text-mono">{r.maxPerRun}/run</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${r.active ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`}>
                    {r.active ? "ACTIVE" : "PAUSED"}
                  </span>
                  <button
                    onClick={() => setRules((p) => p.filter((x) => x.id !== r.id))}
                    className="grid place-items-center h-7 w-7 rounded-md hover:bg-destructive/15 text-destructive"
                  ><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title="Top Candidates" action={<Button variant="secondary" size="sm"><RefreshCw className="h-3 w-3" /> Rescore</Button>} />
            <div className="p-4 grid gap-3 sm:grid-cols-2">
              {candidates.map((c) => (
                <div key={c.title} className="flex gap-3 rounded-md border border-border bg-card/50 p-3">
                  <img src={c.thumb} alt="" className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-2">{c.title}</div>
                    <div className="mt-1 flex gap-3 text-[11px] text-muted-foreground">
                      <span><Eye className="inline h-3 w-3 mr-0.5" />{(c.views / 1000).toFixed(0)}k</span>
                      <span><TrendingUp className="inline h-3 w-3 mr-0.5" />{c.engage}%</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1"><Progress value={c.score} /></div>
                      <span className="text-xs font-bold text-primary">{c.score}</span>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      <Button size="sm"><Wand2 className="h-3 w-3" /> Remix</Button>
                      <Button variant="secondary" size="sm">Skip</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHead title="Schedule" />
            <div className="p-4 space-y-3 text-sm">
              <Field label="Run every">
                <Select><option>15 minutes</option><option>1 hour</option><option>6 hours</option><option>Daily</option></Select>
              </Field>
              <Field label="Publish window">
                <div className="flex gap-2">
                  <Input type="time" defaultValue="09:00" />
                  <Input type="time" defaultValue="21:00" />
                </div>
              </Field>
              <Field label="Max uploads / day">
                <Input type="number" defaultValue={8} />
              </Field>
              <Toggle checked label="Skip weekends" onChange={() => {}} />
            </div>
          </Card>

          <Card>
            <CardHead title="AI Enhancements" />
            <div className="p-4 space-y-2">
              <Toggle checked label="Rewrite titles for CTR" onChange={() => {}} />
              <Toggle checked label="Regenerate thumbnails" onChange={() => {}} />
              <Toggle checked label="Auto-hashtag by niche" onChange={() => {}} />
              <Toggle checked={false} label="AI voiceover overlay" onChange={() => {}} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ onToast }: { onToast: (s: string) => void }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHead title="Pipeline" />
        <div className="p-5 space-y-4">
          <Field label="Output folder">
            <Input defaultValue={String.raw`C:\Users\jamie\Documents\trendclip\output`} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Max duration (s)"><Input type="number" defaultValue={60} /></Field>
            <Field label="Target bitrate (kbps)"><Input type="number" defaultValue={4500} /></Field>
          </div>
          <Field label="FFmpeg preset">
            <Select><option>fast</option><option>medium</option><option>slow</option></Select>
          </Field>
          <Toggle checked label="Safe 9:16 crop" onChange={() => {}} />
          <Toggle checked={false} label="Keep source files" onChange={() => {}} />
        </div>
      </Card>

      <Card>
        <CardHead title="AI Model (Ollama)" />
        <div className="p-5 space-y-4">
          <Field label="Base URL"><Input defaultValue="http://localhost:11434" /></Field>
          <Field label="Model"><Select><option>llama3.1:8b</option><option>llama3.1:70b</option><option>mistral:7b</option></Select></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Temperature"><Input type="number" step="0.1" defaultValue={0.2} /></Field>
            <Field label="Max tokens"><Input type="number" defaultValue={512} /></Field>
          </div>
          <Toggle checked label="Strict JSON output" onChange={() => {}} />
        </div>
      </Card>

      <Card>
        <CardHead title="Server" />
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Host"><Input defaultValue="0.0.0.0" /></Field>
            <Field label="Port"><Input type="number" defaultValue={9443} /></Field>
          </div>
          <Field label="API password"><Input type="password" placeholder="(unset — LAN open)" /></Field>
          <Toggle checked={false} label="Require auth on all endpoints" onChange={() => {}} />
        </div>
      </Card>

      <Card>
        <CardHead title="Notifications" />
        <div className="p-5 space-y-2">
          <Toggle checked label="Toast on job completion" onChange={() => {}} />
          <Toggle checked={false} label="Email digest daily" onChange={() => {}} />
          <Toggle checked label="Telegram alerts on failure" onChange={() => {}} />
          <Field label="Telegram bot token"><Input type="password" placeholder="paste token" /></Field>
        </div>
      </Card>

      <div className="lg:col-span-2 flex justify-end gap-2">
        <Button variant="secondary" onClick={() => onToast("Reset to defaults")}>Reset</Button>
        <Button onClick={() => onToast("Settings saved")}><Gauge className="h-4 w-4" /> Save changes</Button>
      </div>
    </div>
  );
}

function AuthTab({ onToast }: { onToast: (s: string) => void }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHead title="Dashboard access" />
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 rounded-md border border-success/30 bg-success/10 p-3 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            You are signed in as <span className="font-semibold">admin</span>
          </div>
          <Field label="Change password"><Input type="password" placeholder="New password" /></Field>
          <div className="flex gap-2"><Button onClick={() => onToast("Password updated")}>Update</Button><Button variant="secondary" onClick={() => onToast("Signed out")}>Sign out</Button></div>
        </div>
      </Card>

      <Card>
        <CardHead title="YouTube channels" />
        <div className="p-5 space-y-3">
          {[
            { name: "Jamie · Main", email: "jamiealanyork@gmail.com", connected: true },
            { name: "TrendClip Test", email: "trendclip.dev@gmail.com", connected: true },
            { name: "Second channel", email: "—", connected: false },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-md border border-border bg-card/50 p-3">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-9 w-9 rounded-md bg-destructive/15 text-destructive"><Youtube className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.email}</div>
                </div>
              </div>
              {c.connected ? (
                <Button variant="secondary" size="sm" onClick={() => onToast("Disconnected")}>Disconnect</Button>
              ) : (
                <Button size="sm" onClick={() => onToast("OAuth flow opened")}><Upload className="h-3.5 w-3.5" /> Connect</Button>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={() => onToast("OAuth flow opened")}><Plus className="h-4 w-4" /> Add channel</Button>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <CardHead title="API keys" />
        <div className="p-5 grid gap-3 md:grid-cols-2">
          <Field label="YouTube Data API v3">
            <div className="flex gap-2"><Input type="password" defaultValue="AIzaSy••••••••••••••••••••" /><Button variant="secondary" onClick={() => onToast("Copied")}><ClipboardCopy className="h-4 w-4" /></Button></div>
          </Field>
          <Field label="OpenAI (optional)">
            <div className="flex gap-2"><Input type="password" placeholder="sk-…" /><Button variant="secondary"><ClipboardCopy className="h-4 w-4" /></Button></div>
          </Field>
          <Field label="Telegram bot token">
            <Input type="password" placeholder="123456:ABC-…" />
          </Field>
          <Field label="Ngrok tunnel (optional)">
            <Input placeholder="https://xxx.ngrok.app" />
          </Field>
        </div>
        <div className="flex justify-end gap-2 p-5 pt-0">
          <Button onClick={() => onToast("Keys saved")}><Cpu className="h-4 w-4" /> Save keys</Button>
        </div>
      </Card>
    </div>
  );
}
