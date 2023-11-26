interface ButtonProps {
  disabled?: boolean;
  className: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  value: string | number | readonly string[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={props.className}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
