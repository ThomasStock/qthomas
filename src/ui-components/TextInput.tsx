const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={"p-1 m-1 bg-slate-300 shadow grow-0 " + props.className}
    />
  );
};

export default TextInput;
