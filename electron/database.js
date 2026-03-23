const Database = require("better-sqlite3");
const path = require("path");
const { app } = require("electron");

let db;

function getDb() {
  if (db) return db;

  const dbPath = path.join(app.getPath("userData"), "learnnova.db");
  db = new Database(dbPath);

  // Enable WAL mode for better concurrent read performance
  db.pragma("journal_mode = WAL");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL DEFAULT 'Learner',
      avatar TEXT NOT NULL DEFAULT 'MA',
      xp INTEGER NOT NULL DEFAULT 0,
      daily_xp INTEGER NOT NULL DEFAULT 0,
      daily_goal INTEGER NOT NULL DEFAULT 1000,
      daily_date TEXT NOT NULL DEFAULT '',
      topics_mastered INTEGER NOT NULL DEFAULT 0,
      total_answered INTEGER NOT NULL DEFAULT 0,
      total_correct INTEGER NOT NULL DEFAULT 0,
      streak INTEGER NOT NULL DEFAULT 0,
      last_active_date TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS kp_progress (
      slug TEXT PRIMARY KEY,
      answered INTEGER NOT NULL DEFAULT 0,
      correct INTEGER NOT NULL DEFAULT 0,
      mastery REAL NOT NULL DEFAULT 0,
      last_answered TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS topic_progress (
      slug TEXT PRIMARY KEY,
      completed_kps INTEGER NOT NULL DEFAULT 0,
      total_kps INTEGER NOT NULL DEFAULT 0,
      mastered INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS answer_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kp_slug TEXT NOT NULL,
      topic_slug TEXT NOT NULL,
      question_id TEXT,
      correct INTEGER NOT NULL,
      xp_earned INTEGER NOT NULL DEFAULT 0,
      answered_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- Ensure single user row exists
    INSERT OR IGNORE INTO user_profile (id) VALUES (1);
  `);

  return db;
}

// Prepared statements (lazy-initialized)
let stmts = {};

function getStmts() {
  if (stmts._ready) return stmts;
  const d = getDb();

  stmts = {
    _ready: true,
    getProfile: d.prepare("SELECT * FROM user_profile WHERE id = 1"),
    updateProfile: d.prepare(`
      UPDATE user_profile SET
        name = @name, avatar = @avatar, xp = @xp, daily_xp = @dailyXp,
        daily_goal = @dailyGoal, daily_date = @dailyDate,
        topics_mastered = @topicsMastered, total_answered = @totalAnswered,
        total_correct = @totalCorrect, streak = @streak,
        last_active_date = @lastActiveDate, updated_at = datetime('now')
      WHERE id = 1
    `),
    getKpProgress: d.prepare("SELECT * FROM kp_progress WHERE slug = ?"),
    upsertKpProgress: d.prepare(`
      INSERT INTO kp_progress (slug, answered, correct, mastery, last_answered)
      VALUES (@slug, @answered, @correct, @mastery, @lastAnswered)
      ON CONFLICT(slug) DO UPDATE SET
        answered = @answered, correct = @correct, mastery = @mastery, last_answered = @lastAnswered
    `),
    getAllKpProgress: d.prepare("SELECT * FROM kp_progress"),
    getTopicProgress: d.prepare("SELECT * FROM topic_progress WHERE slug = ?"),
    upsertTopicProgress: d.prepare(`
      INSERT INTO topic_progress (slug, completed_kps, total_kps, mastered)
      VALUES (@slug, @completedKps, @totalKps, @mastered)
      ON CONFLICT(slug) DO UPDATE SET
        completed_kps = @completedKps, total_kps = @totalKps, mastered = @mastered
    `),
    getAllTopicProgress: d.prepare("SELECT * FROM topic_progress"),
    insertAnswer: d.prepare(`
      INSERT INTO answer_history (kp_slug, topic_slug, question_id, correct, xp_earned)
      VALUES (@kpSlug, @topicSlug, @questionId, @correct, @xpEarned)
    `),
    resetDailyXp: d.prepare("UPDATE user_profile SET daily_xp = 0, daily_date = ? WHERE id = 1"),
  };

  return stmts;
}

function loadUserData() {
  const s = getStmts();
  const profile = s.getProfile.get();
  const kpRows = s.getAllKpProgress.all();
  const topicRows = s.getAllTopicProgress.all();

  const today = new Date().toISOString().split("T")[0];

  // Reset daily XP if new day
  if (profile.daily_date !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (profile.last_active_date === yesterdayStr) {
      profile.streak += 1;
    } else if (profile.last_active_date !== today) {
      profile.streak = 0;
    }
    profile.daily_xp = 0;
    profile.daily_date = today;
    profile.last_active_date = today;

    s.updateProfile.run({
      name: profile.name, avatar: profile.avatar, xp: profile.xp,
      dailyXp: 0, dailyGoal: profile.daily_goal, dailyDate: today,
      topicsMastered: profile.topics_mastered, totalAnswered: profile.total_answered,
      totalCorrect: profile.total_correct, streak: profile.streak,
      lastActiveDate: today,
    });
  }

  // Build the same shape as the renderer expects
  const kpProgress = {};
  for (const row of kpRows) {
    kpProgress[row.slug] = {
      slug: row.slug, answered: row.answered, correct: row.correct,
      mastery: row.mastery, lastAnswered: row.last_answered,
    };
  }

  const topicProgress = {};
  for (const row of topicRows) {
    topicProgress[row.slug] = {
      slug: row.slug, completedKps: row.completed_kps,
      totalKps: row.total_kps, mastered: !!row.mastered,
    };
  }

  return {
    name: profile.name, avatar: profile.avatar, xp: profile.xp,
    dailyXp: profile.daily_xp, dailyGoal: profile.daily_goal,
    dailyDate: profile.daily_date, topicsMastered: profile.topics_mastered,
    totalAnswered: profile.total_answered, totalCorrect: profile.total_correct,
    streak: profile.streak, lastActiveDate: profile.last_active_date,
    kpProgress, topicProgress,
  };
}

function recordAnswer(kpSlug, topicSlug, totalKpsInTopic, correct, questionId) {
  const s = getStmts();
  const d = getDb();

  const txn = d.transaction(() => {
    const profile = s.getProfile.get();
    const xpEarned = correct ? 10 : 0;

    // Update profile
    s.updateProfile.run({
      name: profile.name, avatar: profile.avatar,
      xp: profile.xp + xpEarned,
      dailyXp: profile.daily_xp + xpEarned,
      dailyGoal: profile.daily_goal,
      dailyDate: profile.daily_date,
      topicsMastered: profile.topics_mastered,
      totalAnswered: profile.total_answered + 1,
      totalCorrect: profile.total_correct + (correct ? 1 : 0),
      streak: profile.streak,
      lastActiveDate: new Date().toISOString().split("T")[0],
    });

    // Update KP progress
    const kp = s.getKpProgress.get(kpSlug) || { slug: kpSlug, answered: 0, correct: 0 };
    const newAnswered = kp.answered + 1;
    const newCorrect = kp.correct + (correct ? 1 : 0);
    const newMastery = Math.min(1, newCorrect / Math.max(newAnswered, 1));

    s.upsertKpProgress.run({
      slug: kpSlug, answered: newAnswered, correct: newCorrect,
      mastery: newMastery, lastAnswered: new Date().toISOString(),
    });

    // Update topic progress
    const topic = s.getTopicProgress.get(topicSlug) || { slug: topicSlug, completed_kps: 0, total_kps: totalKpsInTopic };
    let completedKps = topic.completed_kps;
    if (newMastery >= 0.8 && newAnswered >= 2) {
      // Recount
      const allKps = s.getAllKpProgress.all();
      completedKps = allKps.filter((k) => k.mastery >= 0.8 && k.answered >= 2).length;
      completedKps = Math.min(completedKps, totalKpsInTopic);
    }
    const mastered = completedKps >= totalKpsInTopic ? 1 : 0;

    s.upsertTopicProgress.run({
      slug: topicSlug, completedKps, totalKps: totalKpsInTopic, mastered,
    });

    // Update topics mastered count
    const allTopics = s.getAllTopicProgress.all();
    const masteredCount = allTopics.filter((t) => t.mastered).length;
    d.prepare("UPDATE user_profile SET topics_mastered = ? WHERE id = 1").run(masteredCount);

    // Record answer history
    s.insertAnswer.run({
      kpSlug, topicSlug, questionId: questionId || null,
      correct: correct ? 1 : 0, xpEarned,
    });
  });

  txn();
  return loadUserData();
}

function closeDb() {
  if (db) {
    db.close();
    db = null;
    stmts = {};
  }
}

module.exports = { loadUserData, recordAnswer, closeDb };
