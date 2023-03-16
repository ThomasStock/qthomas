import { useEffect, useState } from "react";
import { Question } from "../../apiClient/types";
import Button from "../../ui-components/Button";

interface WizardStepProps {
  question: Question;
  answer: string | undefined;
  onChange: (value: string) => void;
}

const WizardStep = (props: WizardStepProps) => {
  const { question, onChange, answer } = props;
  const { text, type } = question;

  const [answerInput, setAnswerInput] = useState(answer);

  useEffect(() => {
    // Apply answer in case we mounted before the visitor answers were loaded
    answerInput ?? setAnswerInput(answer);
  }, [answer]);

  const isValid = !question.isRequired || !!answerInput;

  return (
    <div className="flex flex-col grow-0 items-center">
      <span className="mb-3">{text}</span>
      {type === "Choice" ? (
        <div className="flex flex-col items-start mb-6">
          {question.choices.map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                id={choice}
                name="choice"
                value={choice}
                className="mr-3 self-start"
                checked={choice === answerInput}
                onChange={() => setAnswerInput(choice)}
              />
              {choice}
            </label>
          ))}
        </div>
      ) : (
        <input
          value={answerInput ?? ""}
          onChange={(e) => setAnswerInput(e.target.value)}
          className="p-1 m-1 mb-6 bg-slate-300 shadow grow-0"
        />
      )}

      <Button
        className="w-48 mb-2"
        disabled={!isValid}
        onClick={() => onChange(answerInput ?? "")}
      >
        Next
      </Button>
    </div>
  );
};

export default WizardStep;
