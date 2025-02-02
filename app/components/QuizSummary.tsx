import type { Question, Achievement, LeaderboardEntry } from "../types"
import { motion } from "framer-motion"

interface QuizSummaryProps {
  score: number
  totalQuestions: number
  userAnswers: (number | null)[]
  questions: Question[]
  achievements: Achievement[]
  leaderboard: LeaderboardEntry[]
}

export default function QuizSummary({
  score,
  totalQuestions,
  userAnswers,
  questions,
  achievements,
  leaderboard,
}: QuizSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-[rgb(44,39,93)] rounded-lg shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-[rgb(21,142,140)]">Quiz Summary</h2>
      <p className="text-2xl mb-8 text-[rgb(44,39,93)]">
        Your Score: <span className="font-bold text-[rgb(21,142,140)]">{score.toFixed(1)}</span> / {totalQuestions * 4}
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-4 text-[rgb(21,142,140)]">Achievements</h3>
      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-[rgba(21,142,140,0.1)] p-4 rounded-lg border border-[rgba(21,142,140,0.3)]"
            >
              <h4 className="font-bold text-[rgb(21,142,140)]">{achievement.name}</h4>
              <p className="text-[rgb(44,39,93)]">{achievement.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[rgb(44,39,93)] mb-8">No achievements unlocked.</p>
      )}

      <h3 className="text-2xl font-bold mt-8 mb-4 text-[rgb(21,142,140)]">Leaderboard</h3>
      <div className="bg-[rgba(21,142,140,0.1)] p-4 rounded-lg border border-[rgba(21,142,140,0.3)] mb-8">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[rgb(44,39,93)]">
              <th className="py-2">Rank</th>
              <th className="py-2">Name</th>
              <th className="py-2 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={index === 0 ? "font-bold text-[rgb(21,142,140)]" : "text-[rgb(44,39,93)]"}>
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{entry.name}</td>
                <td className="py-2 text-right">{entry.score.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-4 text-[rgb(21,142,140)]">Question Review</h3>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            className="border-b border-[rgba(21,142,140,0.3)] pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-semibold mb-2 text-[rgb(44,39,93)]">
              {index + 1}. {question.description}
            </p>
            <p className="text-sm text-[rgb(44,39,93)]">
              Your Answer:{" "}
              <span
                className={
                  userAnswers[index] !== null && question.options[userAnswers[index]].is_correct
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {userAnswers[index] !== null ? question.options[userAnswers[index]].description : "Not answered"}
              </span>
            </p>
            <p className="text-sm text-[rgb(44,39,93)]">
              Correct Answer:{" "}
              <span className="text-green-600 font-semibold">
                {question.options.find((option) => option.is_correct)?.description}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

