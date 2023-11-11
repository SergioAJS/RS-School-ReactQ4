import { ChangeEvent, Fragment } from 'react';
import { IOption, Option } from 'src/components/select/option/Option';

interface SelectProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
}

export const Select = (props: SelectProps) => {
  const renderOptions = props.options.map((option) => (
    <Fragment key={option.key}>
      <Option value={option.value} text={option.text} />
    </Fragment>
  ));

  return (
    <label>
      {props.label}{' '}
      <select
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onSelect}
      >
        {props.value}
        {renderOptions}
      </select>
    </label>
  );
};
