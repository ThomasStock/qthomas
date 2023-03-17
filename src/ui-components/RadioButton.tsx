import { useId } from "react";

const RadioButton = (props: {
  group: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) => {
  const { group, value, checked, onChange } = props;

  const id = useId();

  return (
    <label key={value}>
      <input
        type="radio"
        id={id}
        name={group}
        value={value}
        className="mr-3 self-start"
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
};

export default RadioButton;
