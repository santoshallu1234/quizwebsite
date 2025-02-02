export interface QuizData {
  id: number
  title: string
  description: string
  difficulty_level: string | null
  topic: string
  duration: number
  negative_marks: string
  correct_answer_marks: string
  questions_count: number
  questions: Question[]
}

export interface Question {
  id: number
  description: string
  options: Option[]
}

export interface Option {
  id: number
  description: string
  is_correct: boolean
}

export interface GameState {
  lives: number
  score: number
  streak: number
  multiplier: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
}

export interface LeaderboardEntry {
  name: string
  score: number
}

