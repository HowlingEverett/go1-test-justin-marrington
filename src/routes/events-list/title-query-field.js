import { DebounceInput } from 'react-debounce-input';

const TitleQueryField = ({ q = '', handleChange = () => {}, debounce = 0 }) => {
  const onChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <>
      <label htmlFor="title-search">Title</label>
      <DebounceInput
        id="title-search"
        type="search"
        value={q}
        onChange={onChange}
        minLength={2}
        debounceTimeout={debounce}
      />
    </>
  );
};

export default TitleQueryField;
