import { useCallback, useEffect, useState } from "react";
import { MODULES } from "./courses";

export type Associate = {
  id: string;
  name: string;
  role: string;
  depot: string;
  email: string;
};

export type AttendanceRecord = {
  associateId: string;
  passed: boolean | null;
  score?: string;
  notes?: string;
};

export type TrainingSession = {
  id: string;
  moduleId: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  trainer: string;
  location: string;
  status: "scheduled" | "completed";
  attendees: AttendanceRecord[];
};

export type TrainingState = {
  associates: Associate[];
  sessions: TrainingSession[];
};

const STORAGE_KEY = "smarter-appliances-training-v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const seedAssociates: Associate[] = [
  { id: "a1", name: "Daniel Okafor", role: "Field Engineer", depot: "Enfield", email: "daniel.okafor@smarterappliances.co.uk" },
  { id: "a2", name: "Priya Sharma", role: "Field Engineer", depot: "Watford", email: "priya.sharma@smarterappliances.co.uk" },
  { id: "a3", name: "Liam Brennan", role: "Warehouse Operative", depot: "Enfield", email: "liam.brennan@smarterappliances.co.uk" },
  { id: "a4", name: "Sofia Kaminski", role: "Delivery Driver", depot: "Slough", email: "sofia.kaminski@smarterappliances.co.uk" },
  { id: "a5", name: "Marcus Bell", role: "Team Leader", depot: "Watford", email: "marcus.bell@smarterappliances.co.uk" },
  { id: "a6", name: "Aisha Rahman", role: "Installer", depot: "Slough", email: "aisha.rahman@smarterappliances.co.uk" },
];

const iso = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

const seedSessions: TrainingSession[] = [
  {
    id: "s1",
    moduleId: MODULES[0].id,
    date: iso(21),
    time: "09:00",
    trainer: "Marcus Bell",
    location: "Enfield Depot — Training Room",
    status: "completed",
    attendees: [
      { associateId: "a1", passed: true, score: "5/5" },
      { associateId: "a3", passed: true, score: "4/5" },
      { associateId: "a4", passed: false, score: "2/5", notes: "Retake booked" },
    ],
  },
  {
    id: "s2",
    moduleId: MODULES[1].id,
    date: iso(9),
    time: "13:30",
    trainer: "Priya Sharma",
    location: "Watford Depot",
    status: "completed",
    attendees: [
      { associateId: "a2", passed: true, score: "4/4" },
      { associateId: "a5", passed: true, score: "4/4" },
    ],
  },
  {
    id: "s3",
    moduleId: MODULES[2].id,
    date: iso(2),
    time: "10:00",
    trainer: "Marcus Bell",
    location: "Slough Depot",
    status: "completed",
    attendees: [
      { associateId: "a6", passed: true, score: "4/4" },
      { associateId: "a4", passed: true, score: "3/4" },
    ],
  },
];

const initialState: TrainingState = { associates: seedAssociates, sessions: seedSessions };

let memory: TrainingState = initialState;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
}

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) memory = JSON.parse(raw) as TrainingState;
  } catch {
    /* ignore corrupt state */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export function useTraining() {
  const [state, setState] = useState<TrainingState>(memory);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    load();
    setState({ ...memory });
    setHydrated(true);
    const listener = () => setState({ ...memory });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addAssociate = useCallback((a: Omit<Associate, "id">) => {
    const created = { ...a, id: uid() };
    memory = { ...memory, associates: [...memory.associates, created] };
    emit();
    return created;
  }, []);

  const createSession = useCallback((s: Omit<TrainingSession, "id" | "attendees" | "status">) => {
    const created: TrainingSession = { ...s, id: uid(), status: "scheduled", attendees: [] };
    memory = { ...memory, sessions: [...memory.sessions, created] };
    emit();
    return created;
  }, []);

  const updateSession = useCallback((id: string, patch: Partial<TrainingSession>) => {
    memory = {
      ...memory,
      sessions: memory.sessions.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    };
    emit();
  }, []);

  const setAttendees = useCallback((id: string, attendees: AttendanceRecord[]) => {
    memory = { ...memory, sessions: memory.sessions.map((s) => (s.id === id ? { ...s, attendees } : s)) };
    emit();
  }, []);

  const deleteSession = useCallback((id: string) => {
    memory = { ...memory, sessions: memory.sessions.filter((s) => s.id !== id) };
    emit();
  }, []);

  const resetDemo = useCallback(() => {
    memory = initialState;
    emit();
  }, []);

  return { ...state, hydrated, addAssociate, createSession, updateSession, setAttendees, deleteSession, resetDemo };
}

export type TranscriptEntry = {
  sessionId: string;
  moduleId: string;
  moduleName: string;
  category: string;
  date: string;
  time: string;
  trainer: string;
  location: string;
  passed: boolean | null;
  score?: string;
  notes?: string;
  expires?: string;
};

export function buildTranscript(associateId: string, sessions: TrainingSession[]): TranscriptEntry[] {
  return sessions
    .flatMap((s) => {
      const record = s.attendees.find((a) => a.associateId === associateId);
      if (!record) return [];
      const mod = MODULES.find((m) => m.id === s.moduleId);
      const expiry = new Date(s.date);
      expiry.setMonth(expiry.getMonth() + (mod?.validityMonths ?? 12));
      return [
        {
          sessionId: s.id,
          moduleId: s.moduleId,
          moduleName: mod?.name ?? s.moduleId,
          category: mod?.category ?? "—",
          date: s.date,
          time: s.time,
          trainer: s.trainer,
          location: s.location,
          passed: record.passed,
          score: record.score,
          notes: record.notes,
          expires: record.passed ? expiry.toISOString().slice(0, 10) : undefined,
        },
      ];
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
