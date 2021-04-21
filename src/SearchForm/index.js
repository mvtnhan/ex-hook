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

  return (
    <form>
      <input
        type="text"
        value={searchItem}
        onChange={handleSearchItemChange}
        autoFocus={true}
      />
    </form>
  );
}

export default SearchForm;
