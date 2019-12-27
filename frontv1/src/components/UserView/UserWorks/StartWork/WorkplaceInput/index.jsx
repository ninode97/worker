import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import "./theme.css";

const getSuggestions = (value, workplaces) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  console.log(workplaces);

  return inputLength === 0
    ? []
    : workplaces.filter(
        workplace =>
          workplace.workplaceCode.toLowerCase().slice(0, inputLength) ===
          inputValue
      );
};
const getSuggestionValue = suggestion => suggestion.workplaceCode;
const renderSuggestion = suggestion => <div>{suggestion.workplaceCode}</div>;

const WorkplaceInput = props => {
  const [suggestions, setSuggestions] = useState([]);
  const { workplaces, workplace, setWorkplace } = props;

  const onChange = (event, { newValue }) => {
    setWorkplace(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, workplaces));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: "Type a workplace code",
    value: workplace,
    onChange: onChange,
    style: styles.input
  };
  return (
    <div style={styles.inputContainer} className="auto-suggest">
      <p> Enter Workplace Code</p>

      <Autosuggest
        id="workplace-suggestions"
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

const styles = {
  inputLabel: {
    fontSize: "1.65rem",
    color: "#111"
  },
  input: {},
  inputContainer: {
    width: "90%"
  }
};

export default WorkplaceInput;
