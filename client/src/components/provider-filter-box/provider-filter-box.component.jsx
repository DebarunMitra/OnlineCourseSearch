import React from 'react';
import './provider-filter-box.style.css';

/*
  Destructuring parameters from props
 */
export const ProviderFilterBox = ({ search, updateProvider, placeholder }) => (
  <div>
    <input
      type="text"
      className="provider-bar"
      value={search}
      onChange={updateProvider}
      placeholder={placeholder}
    />
    <button type="submit" className="provider-button">
      <i className="fas fa-search" />
    </button>
  </div>
);
