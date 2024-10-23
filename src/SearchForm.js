import React from "react";

function SearchForm({ onSubmit }) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchInput = event.target.elements.searchInput.value;
    onSubmit(searchInput);
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <input
        type="search"
        placeholder="Enter a City..."
        required
        id="search-form-input"
        className="search-form-input"
        name="searchInput"
        autoFocus="on"
      />
      <input type="submit" value="Search" className="search-form-button" />
    </form>
  );
}

export default SearchForm;
