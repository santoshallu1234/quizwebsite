import type { QuizData } from "../types"

interface QuizStartProps {
  quizData: QuizData
  onStart: () => void
}

export default function QuizStart({ quizData, onStart }: QuizStartProps) {
  return (
    <div className="bg-white text-[rgb(44,39,93)] rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-4 text-[rgb(21,142,140)]">{quizData.title}</h1>
      <p className="mb-6 text-[rgb(44,39,93)]">{quizData.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[rgba(21,142,140,0.1)] p-4 rounded-lg">
          <p className="font-semibold text-[rgb(21,142,140)]">Total Questions</p>
          <p className="text-2xl font-bold text-[rgb(44,39,93)]">{quizData.questions_count}</p>
        </div>
        <div className="bg-[rgba(21,142,140,0.1)] p-4 rounded-lg">
          <p className="font-semibold text-[rgb(21,142,140)]">Duration</p>
          <p className="text-2xl font-bold text-[rgb(44,39,93)]">{quizData.duration} minutes</p>
        </div>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-[rgb(21,142,140)] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[rgb(18,120,118)] transition-colors"
      >
        Start Quiz
      </button>
    </div>
  )
}

