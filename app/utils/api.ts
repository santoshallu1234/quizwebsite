import type { QuizData } from "../types"
import { dummyQuizData } from "../data/quizData"

export async function fetchQuizData(): Promise<QuizData> {
  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyQuizData)
    }, 1000) // 1 second delay to simulate network request
  })
}

