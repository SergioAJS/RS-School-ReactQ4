import { ChangeEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOption, Option } from 'src/components/select/option/Option';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { setNumberOfItems, setPage } from 'src/redux/housesQuerySlice';

interface SelectProps {
  label: string;
  name: string;
  id: string;
  options: IOption[];
}

const FIRST_PAGE = '1';

export const Select = (props: SelectProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const numberOfItems = useAppSelector(
    (state) => state.housesQuery.numberOfItems
  );

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target.value;
    setNumberOfItems(select);
    dispatch(setNumberOfItems(select));
    dispatch(setPage(FIRST_PAGE));
    localStorage.setItem('numberOfItems-SergioAJS', select);
    navigate('/');
  };

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
        value={numberOfItems}
        onChange={onSelect}
      >
        {numberOfItems}
        {renderOptions}
      </select>
    </label>
  );
};
