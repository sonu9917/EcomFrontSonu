import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State } from 'country-state-city';

const CountryStateSelector = ({ selectedCountry, selectedState, onCountryChange, onStateChange }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  // Initialize country options
  useEffect(() => {
    const countries = Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: c.name
    }));
    setCountryOptions(countries);
  }, []);

  // Update state options when country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry).map(s => ({
        value: s.isoCode,
        label: s.name
      }));
      setStateOptions(states);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">Country:</label>
      <Select
        value={selectedCountry ? { value: selectedCountry, label: countryOptions.find(c => c.value === selectedCountry)?.label } : null}
        onChange={(option) => onCountryChange(option?.value)}
        options={countryOptions}
        placeholder="Select Country"
      />

      <label className="block text-gray-700 font-bold mb-2 mt-4">State:</label>
      <Select
        value={selectedState ? { value: selectedState, label: stateOptions.find(s => s.value === selectedState)?.label } : null}
        onChange={(option) => onStateChange(option?.value)}
        options={stateOptions}
        placeholder="Select State"
        isDisabled={!selectedCountry} // Disable if no country is selected
      />
    </div>
  );
};

export default CountryStateSelector;
