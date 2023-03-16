import { z } from "zod";

export const Profile = z.object({
  id: z.string().uuid(),
  name: z.string()
});
export type Profile = z.infer<typeof Profile>;

const QuestionBase = z.object({
  id: z.string().uuid(),
  type: z.enum(["Text", "Number", "Choice"]),
  text: z.string(),
  isIdentificationField: z.boolean(),
  isRequired: z.boolean()
});
type QuestionBase = z.infer<typeof QuestionBase>;

export const TextQuestion = QuestionBase.extend({
  type: z.literal("Text")
});
export type TextQuestion = z.infer<typeof TextQuestion>;

export const ChoiceQuestion = QuestionBase.extend({
  type: z.literal("Choice"),
  choices: z.array(z.string())
});
export type ChoiceQuestion = z.infer<typeof ChoiceQuestion>;

export const NumberQuestion = QuestionBase.extend({
  type: z.literal("Number")
});
export type NumberQuestion = z.infer<typeof ChoiceQuestion>;

export const Question = ChoiceQuestion.or(NumberQuestion).or(TextQuestion);
export type Question = z.infer<typeof Question>;
