import debounceCallback from 'lodash/debounce';
import Autosuggest from 'react-autosuggest';
import React, { useState } from 'react';

import { geocode } from '../../api';

const joinedAddress = ({ address }) =>
  [
    address.addressTwo,
    address.addressOne,
    address.locality,
    address.region,
    address.postalCode,
  ].join(', ');

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <span>{joinedAddress(suggestion)}</span>
);

const LocationQueryField = ({
  handleAddressSelected = () => {},
  debounce = 0,
}) => {
  const [candidates, setCandidates] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (event, { newValue, method }) => {
    if (method === 'type') {
      setInputValue(newValue);
    } else if (method === 'enter' || method === 'click') {
      setInputValue(joinedAddress(newValue));
    }
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    handleAddressSelected(suggestion);
  };

  const fetchCandidates = async (inputValue) => {
    setIsFetching(true);

    try {
      const response = await geocode(inputValue);
      setCandidates(response.candidates);
    } catch (e) {
      setError(e);
    }

    setIsFetching(false);
  };

  const debouncedFetchCandidates = debounceCallback(fetchCandidates, debounce);

  const onSuggestionsFetchRequested = ({ value }) => {
    debouncedFetchCandidates(value);
  };

  const onSuggestionsClearRequested = () => {
    setCandidates([]);
  };

  return (
    <>
      <div className="status">
        <label htmlFor="location-search">
          {isFetching ? 'Loading addresses...' : 'Near address:'}
        </label>
      </div>
      <Autosuggest
        suggestions={candidates}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={{
          id: 'location-search',
          value: inputValue,
          onChange,
        }}
      />
    </>
  );
};

export default LocationQueryField;
