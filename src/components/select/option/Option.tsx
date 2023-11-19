export interface IOption {
  key: string;
  value: string;
  text: string;
}

interface OptionProps {
  value: string;
  text: string;
}

export const Option = (props: OptionProps) => {
  return <option value={props.value}>{props.text}</option>;
};
