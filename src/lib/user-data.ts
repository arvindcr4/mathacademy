"use client";

export interface UserData {
  name: string;
  avatar: string;
  xp: number;
  dailyXp: number;
  dailyGoal: number;
  dailyDate: string; // ISO date for resetting daily XP
  topicsMastered: number;
  totalAnswered: number;
  totalCorrect: number;
  streak: number;
  lastActiveDate: string;
  topicProgress: Record<string, TopicProgress>;
  kpProgress: Record<string, KpProgress>;
}

export interface TopicProgress {
  slug: string;
  completedKps: number;
  totalKps: number;
  mastered: boolean;
}

export interface KpProgress {
  slug: string;
  answered: number;
  correct: number;
  mastery: number; // 0-1
  lastAnswered: string;
}

// Electron API type declaration
declare global {
  interface Window {
    electronAPI?: {
      db?: {
        loadUserData: () => Promise<UserData>;
        recordAnswer: (kpSlug: string, topicSlug: string, totalKpsInTopic: number, correct: boolean, questionId?: string) => Promise<UserData>;
      };
    };
  }
}

const STORAGE_KEY = "learnnova_user_data_v2";

const today = () => new Date().toISOString().split("T")[0];

function defaultUserData(): UserData {
  return {
    name: "Learner",
    avatar: "MA",
    xp: 0,
    dailyXp: 0,
    dailyGoal: 1000,
    dailyDate: today(),
    topicsMastered: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastActiveDate: today(),
    topicProgress: {},
    kpProgress: {},
  };
}

function isElectronDb(): boolean {
  return typeof window !== "undefined" && !!window.electronAPI?.db;
}

// Async versions for Electron SQLite
export async function loadUserDataAsync(): Promise<UserData> {
  if (isElectronDb()) {
    try {
      return await window.electronAPI!.db!.loadUserData();
    } catch {
      return loadUserData(); // fallback to localStorage
    }
  }
  return loadUserData();
}

export async function recordAnswerAsync(
  kpSlug: string,
  topicSlug: string,
  totalKpsInTopic: number,
  correct: boolean,
  questionId?: string,
): Promise<UserData> {
  if (isElectronDb()) {
    try {
      return await window.electronAPI!.db!.recordAnswer(kpSlug, topicSlug, totalKpsInTopic, correct, questionId);
    } catch {
      return recordAnswer(kpSlug, topicSlug, totalKpsInTopic, correct);
    }
  }
  return recordAnswer(kpSlug, topicSlug, totalKpsInTopic, correct);
}

export function loadUserData(): UserData {
  if (typeof window === "undefined") return defaultUserData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultUserData();
    const data: UserData = { ...defaultUserData(), ...JSON.parse(raw) };
    // Reset daily XP if it's a new day
    if (data.dailyDate !== today()) {
      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      if (data.lastActiveDate === yesterdayStr || data.lastActiveDate === today()) {
        data.streak = data.streak + (data.lastActiveDate === yesterdayStr ? 1 : 0);
      } else {
        data.streak = 0;
      }
      data.dailyXp = 0;
      data.dailyDate = today();
      data.lastActiveDate = today();
      saveUserData(data);
    }
    return data;
  } catch {
    return defaultUserData();
  }
}

export function saveUserData(data: UserData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export function recordAnswer(
  kpSlug: string,
  topicSlug: string,
  totalKpsInTopic: number,
  correct: boolean,
): UserData {
  const data = loadUserData();

  // Update totals
  data.totalAnswered++;
  if (correct) {
    data.totalCorrect++;
    const xpEarned = 10;
    data.xp += xpEarned;
    data.dailyXp += xpEarned;
  }
  data.lastActiveDate = today();

  // Update KP progress
  const kp = data.kpProgress[kpSlug] || { slug: kpSlug, answered: 0, correct: 0, mastery: 0, lastAnswered: "" };
  kp.answered++;
  if (correct) kp.correct++;
  kp.mastery = Math.min(1, kp.correct / Math.max(kp.answered, 1));
  kp.lastAnswered = new Date().toISOString();
  data.kpProgress[kpSlug] = kp;

  // Update topic progress
  const topic = data.topicProgress[topicSlug] || { slug: topicSlug, completedKps: 0, totalKps: totalKpsInTopic, mastered: false };
  topic.totalKps = totalKpsInTopic;
  // Simpler: just check if this KP is now mastered
  if (kp.mastery >= 0.8 && kp.answered >= 2) {
    // Recount completed KPs for this topic
    let completed = 0;
    for (const [, kpData] of Object.entries(data.kpProgress)) {
      if (kpData.mastery >= 0.8 && kpData.answered >= 2) {
        completed++;
      }
    }
    topic.completedKps = Math.min(completed, topic.totalKps);
    topic.mastered = topic.completedKps >= topic.totalKps;
  }
  data.topicProgress[topicSlug] = topic;

  // Count total mastered topics
  data.topicsMastered = Object.values(data.topicProgress).filter((t) => t.mastered).length;

  saveUserData(data);
  return data;
}

export function getAccuracy(data: UserData): number {
  if (data.totalAnswered === 0) return 0;
  return Math.round((data.totalCorrect / data.totalAnswered) * 100);
}

export function getLeague(xp: number): string {
  if (xp >= 50000) return "master";
  if (xp >= 25000) return "diamond";
  if (xp >= 10000) return "platinum";
  if (xp >= 5000) return "gold";
  if (xp >= 2000) return "silver";
  return "bronze";
}

export function getTopicMastery(data: UserData, topicSlug: string): number {
  const topic = data.topicProgress[topicSlug];
  if (!topic || topic.totalKps === 0) return 0;
  return topic.completedKps / topic.totalKps;
}

export function getKpMastery(data: UserData, kpSlug: string): number {
  return data.kpProgress[kpSlug]?.mastery || 0;
}
