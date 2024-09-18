import React from 'react'

const SearchBar = ({ cityName, onCityChange, onSearch, addToFavorites, isHome, selectedDate, onDateChange }) => {
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      addToFavorites(cityName);
    }
  };


  return (<>
    <div className="card shadow-sm p-4 mb-4 bg-light" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <label htmlFor="cityName" className="form-label fw-bold">City Name</label>
        <input
          type="text"
          id="cityName"
          className="form-control form-control-lg"
          placeholder="E.g. New York, Bengaluru"
          value={cityName}
          onChange={onCityChange}
        />
        <label htmlFor="date" className="form-label mt-3 fw-bold">Date</label>
          <input
            type="date"
            id="date"
            className="form-control form-control-lg"
            value={selectedDate}
            onChange={onDateChange}
          />
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSearch}
          >
            Search
          </button>
          {isHome && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>


  </>
  );
}

export default SearchBar
