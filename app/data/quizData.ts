import type { QuizData } from "../types"

export const dummyQuizData: QuizData = {
  id: 60,
  title: "Genetics and Evolution",
  description: "Test your knowledge on the molecular basis of inheritance",
  difficulty_level: "Intermediate",
  topic: "The Molecular Basis of Inheritance",
  duration: 15,
  negative_marks: "1.0",
  correct_answer_marks: "4.0",
  questions_count: 5,
  questions: [
    {
      id: 1,
      description: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is:",
      options: [
        { id: 1, description: "5'UUUU3'", is_correct: false },
        { id: 2, description: "3'UUUU5'", is_correct: false },
        { id: 3, description: "5'AAAU3'", is_correct: true },
        { id: 4, description: "3'AAAU5'", is_correct: false },
      ],
    },
    {
      id: 2,
      description: "Which of the following is NOT a nitrogenous base found in DNA?",
      options: [
        { id: 5, description: "Adenine", is_correct: false },
        { id: 6, description: "Cytosine", is_correct: false },
        { id: 7, description: "Uracil", is_correct: true },
        { id: 8, description: "Guanine", is_correct: false },
      ],
    },
    {
      id: 3,
      description: "What is the function of DNA ligase in DNA replication?",
      options: [
        { id: 9, description: "To separate DNA strands", is_correct: false },
        { id: 10, description: "To join Okazaki fragments", is_correct: true },
        { id: 11, description: "To add primers", is_correct: false },
        { id: 12, description: "To remove primers", is_correct: false },
      ],
    },
    {
      id: 4,
      description: "Which of the following best describes the structure of DNA?",
      options: [
        { id: 13, description: "Single-stranded helix", is_correct: false },
        { id: 14, description: "Double-stranded helix", is_correct: true },
        { id: 15, description: "Triple-stranded helix", is_correct: false },
        { id: 16, description: "Quadruple-stranded helix", is_correct: false },
      ],
    },
    {
      id: 5,
      description: "What is the name of the process by which DNA makes a copy of itself?",
      options: [
        { id: 17, description: "Transcription", is_correct: false },
        { id: 18, description: "Translation", is_correct: false },
        { id: 19, description: "Replication", is_correct: true },
        { id: 20, description: "Mutation", is_correct: false },
      ],
    },
  ],
}

