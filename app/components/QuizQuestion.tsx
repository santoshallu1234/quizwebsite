import type { Question } from "../types"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Zap } from "lucide-react"

interface QuizQuestionProps {
  question: Question
  onAnswer: (answerIndex: number | null) => void
  currentQuestionIndex: number
  totalQuestions: number
  timeLeft: number
  onUsePowerUp: () => void
  powerUpsAvailable: number
}

export default function QuizQuestion({
  question,
  onAnswer,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  onUsePowerUp,
  powerUpsAvailable,
}: QuizQuestionProps) {
  const [shuffledOptions, setShuffledOptions] = useState<typeof question.options>([])

  useEffect(() => {
    if (question && question.options) {
      setShuffledOptions([...question.options].sort(() => Math.random() - 0.5))
    }
  }, [question])

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  if (!question || !question.options) {
    return <div>Loading question...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-[rgb(44,39,93)] rounded-lg shadow-lg p-8"
    >
      <div className="mb-6">
        <div className="w-full bg-[rgba(21,142,140,0.2)] rounded-full h-2">
          <div
            className="bg-[rgb(21,142,140)] h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-[rgb(21,142,140)]">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>
      <p className="mb-6 text-[rgb(44,39,93)]">{question.description}</p>
      <div className="space-y-3">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => onAnswer(question.options.findIndex((o) => o.id === option.id))}
            className="w-full text-left p-4 rounded-lg border border-[rgba(21,142,140,0.3)] hover:border-[rgb(21,142,140)] hover:bg-[rgba(21,142,140,0.1)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.description}
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold text-[rgb(21,142,140)]">Time Left: {timeLeft} seconds</p>
        <button
          onClick={onUsePowerUp}
          disabled={powerUpsAvailable === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold ${
            powerUpsAvailable > 0
              ? "bg-[rgb(21,142,140)] hover:bg-[rgb(18,120,118)] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Zap className="w-5 h-5 mr-2" />
          Use Power-Up ({powerUpsAvailable})
        </button>
      </div>
    </motion.div>
  )
}

