import { useEffect, useId, useState } from "react";
import { Question } from "../../apiClient/types";
import Button from "../../ui-components/Button";
import RadioButton from "../../ui-components/RadioButton";
import TextInput from "../../ui-components/TextInput";

interface QuestionFormProps {
  question: Question;
  answer: string | undefined;
  confirmButtonLabel: string;
  onChange: (value: string) => void;
}

const QuestionForm = (props: QuestionFormProps) => {
  const { question, onChange, answer, confirmButtonLabel } = props;
  const { text, type } = question;

  const id = useId();

  const [answerInput, setAnswerInput] = useState(answer);

  useEffect(() => {
    // Apply answer in case we mounted before the visitor answers were loaded
    answerInput ?? setAnswerInput(answer);
  }, [answer]);

  const isValid = !question.isRequired || !!answerInput;

  const handleEntry = (value: string) => {
    if (type === "Number") {
      if (isNaN(value as any)) {
        return;
      }
    }
    setAnswerInput(value);
  };

  return (
    <div className="flex flex-col grow-0 items-center">
      <span className="mb-3">{text}</span>
      {type === "Choice" ? (
        <div className="flex flex-col items-start mb-6">
          {question.choices.map((choice) => (
            <RadioButton
              key={choice}
              group={`${id}_choice`}
              value={choice}
              checked={choice === answerInput}
              onChange={() => setAnswerInput(choice)}
            />
          ))}
        </div>
      ) : (
        <TextInput
          value={answerInput ?? ""}
          onChange={(e) => handleEntry(e.target.value)}
          className="mb-6"
        />
      )}

      <Button
        className="w-48 mb-2"
        disabled={!isValid}
        onClick={() => onChange(answerInput ?? "")}
      >
        {confirmButtonLabel}
      </Button>
    </div>
  );
};

export default QuestionForm;
