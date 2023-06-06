import { useEffect, useState } from "react";
import styles from "@/app/(styles)/input.module.scss";

function Input({
  dictionary,
  labelText,
  value,
  onChange,
  inputClass,
  className,
  ...rest
}) {
  const ESCAPE_KEYCODE = 27;
  const UP_KEYCODE = 38;
  const DOWN_KEYCODE = 40;
  const ENTER_KEYCODE = 13;
  const SUGGESTIONS_LENGTH = 5;
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  useEffect(() => {
    if (!dictionary || !showSuggestions) {
      return;
    }
    const filter = value.toLowerCase();
    const newSuggestions = dictionary
      .filter((e) => e.toLowerCase().includes(filter))
      .slice(0, SUGGESTIONS_LENGTH);
    setSuggestions(newSuggestions);
  }, [value, dictionary]);

  function handleBlur() {
    //setTimeout needed to let the click of the suggestion happen before the following code:
    setTimeout(() => {
      setShowSuggestions(false);
      setSuggestions([]);
    }, 100);
  }

  function handleKeyDown(e) {
    if (e.keyCode === ESCAPE_KEYCODE) {
      handleBlur();
    } else if (e.keyCode === DOWN_KEYCODE) {
      const newIndex = Math.min(
        activeSuggestionIndex + 1,
        suggestions.length - 1
      );
      setActiveSuggestionIndex(newIndex);
    } else if (e.keyCode === UP_KEYCODE) {
      const newIndex = Math.max(activeSuggestionIndex - 1, 0);
      setActiveSuggestionIndex(newIndex);
    } else if (e.keyCode === ENTER_KEYCODE) {
      onChange(suggestions[activeSuggestionIndex]);
      handleBlur();
    }
  }

  return (
    <div className={` ${styles.input_wrapper} ${className}`} {...rest}>
      <label className="mb-2">{labelText}</label>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => {
          setShowSuggestions(true);
          onChange(e.target.value);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {suggestions.length ? (
        <div className={styles.suggestions}>
          {suggestions.map((suggestion, currentIndex) => (
            <span
              key={suggestion}
              onClick={() => {
                onChange(suggestion);
              }}
              className={
                activeSuggestionIndex === currentIndex
                  ? styles.active_suggestion
                  : ""
              }
              onMouseOver={() => setActiveSuggestionIndex(currentIndex)}
            >
              {suggestion}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Input;
