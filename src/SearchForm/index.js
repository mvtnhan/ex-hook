import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

SearchForm.defaultProp = {
  onSubmit: null,
};

function SearchForm(props) {
  const { onSubmit } = props;
  const [searchItem, setSearchItem] = useState("");
  const typingTimeoutRef = useRef(null);
  const searchFocus = useRef(null);

  function handleSearchItemChange(e) {
    const value = e.target.value;
    setSearchItem(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchItem: value,
      };
      onSubmit(formValue);
    }, 300);
  }

  function handleFocus() {
    searchFocus.current.focus();
  }

  return (
    <form>
      <input
        id="ip"
        type="text"
        value={searchItem}
        onChange={handleSearchItemChange}
        ref={searchFocus}
      />

      <button type="button" onClick={handleFocus}>
        Click me to focus on the text field!
      </button>
    </form>
  );
}

export default SearchForm;
