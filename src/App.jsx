import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"

const App = () => {
  const countryData = Country.getAllCountries();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      const formattedStateOptions = states.map(state => ({
        value: state.isoCode,
        label: state.name
      }));
      setStateOptions(formattedStateOptions);
      setSelectedState(null);
    }
  }, [selectedCountry]);

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    toast.success(`Selected state: ${selectedOption.label}`);
  };

  const countryOptions = countryData.map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-600">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Country And State Selectors</h2>
        <div className="flex flex-wrap gap-20">
          <div>
            <p className="text-teal-800 font-semibold mb-2">Country :</p>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
          </div>
          <div>
            <p className="text-teal-800 font-semibold mb-2">State :</p>
            <Select
              options={stateOptions}
              value={selectedState}
              onChange={handleStateChange}
              isDisabled={!selectedCountry}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
