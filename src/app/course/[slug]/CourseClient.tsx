"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { courses, Topic, Question } from "@/lib/curriculum";
import {
  loadUserData,
  loadUserDataAsync,
  recordAnswerAsync,
  getTopicMastery,
  getKpMastery,
  UserData,
} from "@/lib/user-data";

export default function CourseClient() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find((c) => c.slug === slug);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(
    course ? course.topics[0] : null,
  );
  const [currentKpIndex, setCurrentKpIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [userData, setUserData] = useState<UserData>(() => loadUserData());
  const [sessionXp, setSessionXp] = useState(0);

  const [questionBank, setQuestionBank] = useState<Record<string, Question[]> | null>(null);
  useEffect(() => {
    import("@/lib/questions").then((mod) => {
      setQuestionBank(mod.getAllQuestions());
    });
  }, []);

  const selectedTopicRef = useRef(selectedTopic);
  selectedTopicRef.current = selectedTopic;

  useEffect(() => {
    loadUserDataAsync().then(setUserData);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href="/" className="text-blue-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const currentKp = selectedTopic?.knowledgePoints[currentKpIndex];
  const totalKps = selectedTopic?.knowledgePoints.length || 0;
  const kpQuestions: Question[] = currentKp
    ? questionBank?.[currentKp.slug] || currentKp.questions || []
    : [];
  const kpProg = currentKp ? userData.kpProgress[currentKp.slug] : undefined;
  const questionIndex = kpProg ? kpProg.answered % Math.max(kpQuestions.length, 1) : 0;
  const currentQuestion = kpQuestions[questionIndex] || null;

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentKp || !selectedTopic || !currentQuestion) return;
    const isCorrect =
      currentQuestion.type === "true-false"
        ? String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase()
        : selectedAnswer === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setSessionXp((prev) => prev + 10);

    recordAnswerAsync(currentKp.slug, selectedTopic.slug, totalKps, isCorrect, currentQuestion.id)
      .then(setUserData);

    const answeredCount = (userData.kpProgress[currentKp.slug]?.answered || 0) + 1;
    const shouldAdvance = answeredCount >= kpQuestions.length && currentKpIndex < totalKps - 1;

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (shouldAdvance) {
        setCurrentKpIndex((prev) => prev + 1);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${course.color}33` }}>{course.icon}</div>
              <div>
                <h1 className="font-semibold text-base m-0">{course.name}</h1>
                <div className="text-xs text-gray-400">{course.category.replace("-", " ")}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-full">
              <span className="text-yellow-400 font-bold">+{sessionXp}</span>
              <span className="text-xs text-gray-400">XP this session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Total:</span>
              <span className="text-sm font-bold text-yellow-400">{userData.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Topics</h3>
              <div className="space-y-2">
                {course.topics.map((topic) => {
                  const mastery = getTopicMastery(userData, topic.slug);
                  const isActive = selectedTopic?.id === topic.id;
                  return (
                    <button key={topic.id}
                      onClick={() => { setSelectedTopic(topic); setCurrentKpIndex(0); setSelectedAnswer(null); setFeedback(null); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{topic.name}</span>
                        {mastery > 0 && <span className="text-xs text-green-400">{Math.round(mastery * 100)}%</span>}
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${mastery * 100}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {selectedTopic && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedTopic.name}</h2>
                  <p className="text-gray-400">{selectedTopic.description}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Knowledge Points ({currentKpIndex + 1} of {totalKps})</span>
                    <span className="text-sm font-medium">{currentKp?.name || "Complete"}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2" role="progressbar" aria-label="Knowledge point progress">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${((currentKpIndex + 1) / totalKps) * 100}%` }} data-testid="kp-progress-fill" />
                  </div>
                  {currentKp && (
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                      <span>Mastery: {Math.round(getKpMastery(userData, currentKp.slug) * 100)}%</span>
                      <span>Answered: {userData.kpProgress[currentKp.slug]?.answered || 0}</span>
                      <span>Correct: {userData.kpProgress[currentKp.slug]?.correct || 0}</span>
                    </div>
                  )}
                </div>

                {currentKp && currentQuestion ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${currentQuestion.difficulty === "easy" ? "bg-green-500/20 text-green-400" : currentQuestion.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{currentQuestion.difficulty}</span>
                      <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">{currentQuestion.type === "multiple-choice" ? "Multiple Choice" : currentQuestion.type === "true-false" ? "True / False" : "Coding"}</span>
                      <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">10 XP</span>
                    </div>
                    <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
                    {currentQuestion.codeSnippet && (
                      <pre className="bg-black/40 rounded-lg p-4 text-sm overflow-x-auto border border-white/10"><code>{currentQuestion.codeSnippet}</code></pre>
                    )}
                    {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, i) => (
                          <button key={i} onClick={() => feedback === null && setSelectedAnswer(i)} disabled={feedback !== null}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition ${feedback !== null && i === currentQuestion.correctAnswer ? "border-green-500 bg-green-500/20" : ""} ${feedback === "incorrect" && i === selectedAnswer ? "border-red-500 bg-red-500/20" : ""} ${feedback === null && selectedAnswer === i ? "border-blue-500 bg-blue-500/20" : ""} ${feedback === null && selectedAnswer !== i ? "border-white/10 hover:border-white/30 hover:bg-white/5" : ""} ${feedback !== null ? "cursor-default" : "cursor-pointer"}`}>
                            <span className="text-gray-400 mr-3">{String.fromCharCode(65 + i)}.</span>{option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion.type === "true-false" && (
                      <div className="flex gap-4">
                        {["true", "false"].map((val) => (
                          <button key={val} onClick={() => feedback === null && setSelectedAnswer(val)} disabled={feedback !== null}
                            className={`flex-1 px-6 py-4 rounded-lg border text-lg font-semibold transition ${feedback !== null && val === String(currentQuestion.correctAnswer).toLowerCase() ? "border-green-500 bg-green-500/20" : ""} ${feedback === "incorrect" && val === String(selectedAnswer).toLowerCase() ? "border-red-500 bg-red-500/20" : ""} ${feedback === null && selectedAnswer === val ? "border-blue-500 bg-blue-500/20" : ""} ${feedback === null && selectedAnswer !== val ? "border-white/10 hover:border-white/30 hover:bg-white/5" : ""}`}>
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                    {feedback === null && currentQuestion.hints && currentQuestion.hints.length > 0 && (
                      <details className="text-sm">
                        <summary className="text-gray-400 cursor-pointer hover:text-white">Need a hint?</summary>
                        <div className="mt-2 space-y-1">
                          {currentQuestion.hints.map((hint, i) => (<div key={i} className="text-yellow-400/80">{"\u2192"} {hint}</div>))}
                        </div>
                      </details>
                    )}
                    {feedback && (
                      <div className={`p-4 rounded-lg ${feedback === "correct" ? "bg-green-500/20 border border-green-500/50" : "bg-red-500/20 border border-red-500/50"}`}>
                        {feedback === "correct" ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{"\u2713"}</span>
                            <div><div className="font-semibold text-green-400">Correct!</div><div className="text-sm text-gray-400">+10 XP earned</div></div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{"\u2717"}</span><div className="font-semibold text-red-400">Incorrect</div></div>
                            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                              <p className="text-sm text-gray-400">Correct answer: <span className="text-green-400">{currentQuestion.options[currentQuestion.correctAnswer as number]}</span></p>
                            )}
                          </div>
                        )}
                        {currentQuestion.explanation && (
                          <div className="mt-3 pt-3 border-t border-white/10 text-sm text-gray-300">{currentQuestion.explanation}</div>
                        )}
                      </div>
                    )}
                    {!feedback && (
                      <button onClick={handleSubmit} disabled={selectedAnswer === null}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${selectedAnswer !== null ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}>
                        Check Answer
                      </button>
                    )}
                  </div>
                ) : currentKp && !questionBank ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-400">Loading questions...</p>
                  </div>
                ) : currentKp && kpQuestions.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">{currentKp.name}</h3>
                    <p className="text-gray-400 mb-4">Questions for this knowledge point are coming soon. Use the Next button to continue.</p>
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <button onClick={() => { setCurrentKpIndex((prev) => Math.max(0, prev - 1)); setSelectedAnswer(null); setFeedback(null); }} disabled={currentKpIndex === 0}
                    className={`px-4 py-2 rounded-lg transition ${currentKpIndex === 0 ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"}`}>
                    {"\u2190"} Previous
                  </button>
                  {currentKpIndex === totalKps - 1 ? (
                    <Link href={`/course/${course.slug}`} data-testid="complete-topic-btn" className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition">Complete Topic {"\u2713"}</Link>
                  ) : (
                    <button onClick={() => { const t = selectedTopicRef.current; const n = t?.knowledgePoints.length || 0; setCurrentKpIndex((prev) => Math.min(n - 1, prev + 1)); setSelectedAnswer(null); setFeedback(null); }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">Next {"\u2192"}</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
