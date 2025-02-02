"use client"
import { Header } from "../header"
import { useState, useEffect } from "react"
import QuizStart from "../components/QuizStart"
import QuizQuestion from "../components/QuizQuestion"
import QuizSummary from "../components/QuizSummary"
import GameStateDisplay from "../components/GameStateDisplay"
import { fetchQuizData } from "../utils/api"
import type { QuizData, GameState, LeaderboardEntry } from "../types"

const INITIAL_LIVES = 3
const INITIAL_POWER_UPS = 2

export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizEnded, setQuizEnded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<GameState>({
    lives: INITIAL_LIVES,
    score: 0,
    streak: 0,
    multiplier: 1,
    achievements: [],
  })
  const [powerUpsAvailable, setPowerUpsAvailable] = useState(INITIAL_POWER_UPS)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizData(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed to load quiz data:", err)
        setLoading(false)
      }
    }

    loadQuizData()
  }, [])

  useEffect(() => {
    if (quizStarted && !quizEnded && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted && !quizEnded) {
      handleAnswer(null)
    }
  }, [quizStarted, quizEnded, timeLeft])

  const startQuiz = () => {
    setQuizStarted(true)
    setUserAnswers(new Array(quizData?.questions.length).fill(null))
    setTimeLeft(30) // Set initial time for the first question
    setGameState({
      lives: INITIAL_LIVES,
      score: 0,
      streak: 0,
      multiplier: 1,
      achievements: [],
    })
    setPowerUpsAvailable(INITIAL_POWER_UPS)
  }

  const handleAnswer = (answerIndex: number | null) => {
    if (!quizData) return

    const currentQuestion = quizData.questions[currentQuestionIndex]
    const isCorrect = answerIndex !== null && currentQuestion.options[answerIndex]?.is_correct

    setUserAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = answerIndex
      return newAnswers
    })

    setGameState((prev) => {
      let newLives = prev.lives
      const newStreak = isCorrect ? prev.streak + 1 : 0
      const newMultiplier = Math.min(2, 1 + newStreak * 0.1)
      let newScore = prev.score

      if (isCorrect) {
        newScore += Number.parseFloat(quizData.correct_answer_marks) * newMultiplier
      } else {
        newLives--
        newScore -= Number.parseFloat(quizData.negative_marks)
      }

      // Check for achievements
      const newAchievements = [...prev.achievements]
      if (newStreak === 3 && !newAchievements.some((a) => a.id === "streak3")) {
        newAchievements.push({
          id: "streak3",
          name: "On Fire!",
          description: "Answer 3 questions correctly in a row",
          unlocked: true,
        })
      }

      return {
        lives: newLives,
        score: Math.max(0, newScore),
        streak: newStreak,
        multiplier: newMultiplier,
        achievements: newAchievements,
      }
    })

    if (currentQuestionIndex < quizData.questions.length - 1 && gameState.lives > 0) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeft(30) // Reset timer for the next question
    } else {
      endQuiz()
    }
  }

  const endQuiz = () => {
    setQuizEnded(true)
    // Update leaderboard
    setLeaderboard((prev) => {
      const newLeaderboard = [...prev, { name: "Player", score: gameState.score }]
      return newLeaderboard.sort((a, b) => b.score - a.score).slice(0, 10)
    })
  }

  const usePowerUp = () => {
    if (powerUpsAvailable > 0) {
      setPowerUpsAvailable((prev) => prev - 1)
      setTimeLeft((prev) => prev + 10) // Add 10 seconds to the timer
    }
  }

  if (loading)
    return (
      <div className="h-screen overflow-hidden">
      <Header />
      <div className="min-h-screen bg-[rgb(44,39,93)] text-white flex justify-center items-center">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
        </div>
      </div>
      </div>
    )
      if (!quizData)
    return (
      <div className="flex justify-center items-center h-screen bg-[rgb(44,39,93)] text-white">
        No quiz data available.
      </div>
    )

  return (
    <div className="h-screen">
    <Header />
    <div className="min-h-screen bg-[rgb(44,39,93)] text-white flex justify-center items-center">
      <div className="container mx-auto px-4 py-8 pb-12 max-w-4xl">
        {!quizStarted && <QuizStart quizData={quizData} onStart={startQuiz} />}
        {quizStarted && !quizEnded && (
          <>
            <GameStateDisplay  gameState={gameState} />
            <QuizQuestion
              question={quizData.questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={quizData.questions.length}
              timeLeft={timeLeft}
              onUsePowerUp={usePowerUp}
              powerUpsAvailable={powerUpsAvailable}
            />
          </>
        )}
        {quizEnded && (
          <QuizSummary
            score={gameState.score}
            totalQuestions={quizData.questions.length}
            userAnswers={userAnswers}
            questions={quizData.questions}
            achievements={gameState.achievements}
            leaderboard={leaderboard}
          />
        )}
      </div>
    </div>
    </div>
  )
}

