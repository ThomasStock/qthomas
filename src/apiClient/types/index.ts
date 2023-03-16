export interface Profile {
  id: string;
  name: string;
}

interface QuestionBase {
  id: string;
  type: "Text" | "Number" | "Choice";
  text: string;
  isIdentificationField: boolean;
  isRequired: boolean;
}

export interface TextQuestion extends QuestionBase {
  type: "Text";
}

export interface NumberQuestion extends QuestionBase {
  type: "Number";
}

export interface ChoiceQuestion extends QuestionBase {
  type: "Choice";
  choices: string[];
}

export type Question = TextQuestion | NumberQuestion | ChoiceQuestion;

export type Answer = string;
// export type Answer<T extends Question = Question> = T extends
//   | TextQuestion
//   | ChoiceQuestion
//   ? string // A Text and Choice question both have a string answer
//   : number;

export type Answers = { [questionKey: string]: Answer };

export type Visitor = {
  id: string;
  fields: { questionId: string; value: string }[];
};
