import { useState } from "react";
import { Question } from "../../apiClient/types";
import Button from "../../ui-components/Button";

interface WizardStepProps {
  question: Question;
  answer: string;
  onChange: (value: string) => void;
}

const WizardStep = (props: WizardStepProps) => {
  const { question, onChange, answer } = props;
  const { text } = question;

  const [answerInput, setAnswerInput] = useState(answer ?? "");

  const isValid = !question.isRequired || !!answerInput;

  return (
    <div className="flex flex-col grow-0 items-center">
      <span className="mb-3">{text}</span>
      <input
        value={answerInput}
        onChange={(e) => setAnswerInput(e.target.value)}
        className="p-1 m-1 mb-6 bg-slate-300 shadow grow-0"
      />
      <Button
        className="w-48 mb-2"
        disabled={!isValid}
        onClick={(e) => onChange(answerInput)}
      >
        Next
      </Button>
    </div>
  );
};

export default WizardStep;
