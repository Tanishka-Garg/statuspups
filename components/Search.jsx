// components/Search.jsx

import React, { useState } from 'react';
// import axios from 'axios';


const Search = ({ onSave, submitting }) => {
  const [filter, setFilter] = useState('');
  const [responseCodes, setResponseCodes] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const fetchImages = async (codes) => {
    const fetchedCodes = [];
    for (let code of codes) {
      try {
        const imageLink = `https://http.dog/${code}.jpg`;
        fetchedCodes.push({ code, imageLink });
      } catch (error) {
        console.error(`Error fetching image for code ${code}:`, error);
      }
    }
    setResponseCodes(fetchedCodes);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const codes = getResponseCodesFromFilter(filter);
    fetchImages(codes);
  };

  const getResponseCodesFromFilter = (filter) => {
    const codes = [];
    if (filter.includes('xx')) {
      const prefix = filter.replace('xx', '');
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          codes.push(`${prefix}${i}${j}`);
        }
      }
    } else if (filter.includes('x')) {
      const prefix = filter.replace('x', '');
      for (let i = 0; i < 10; i++) {
        codes.push(`${prefix}${i}`);
      }
    } else {
      codes.push(filter);
    }
    return codes;
  };

  const handleSaveList = async () => {
    const listName = prompt('Enter a name for your list:');
    if (!listName) return;
    const newList = {
      name: listName,
      creationDate: new Date(),
      responseCodes,
    };
    try {
      await onSave(newList);
    } catch (error) {
      console.error('Failed to save list:', error);
    }
  };

  return (
    <div>
      <h1 className='head_text text-center blue_gradient'>Search Response Codes</h1>
      <div className='desc text-center'>
      <form  onSubmit={handleFilterSubmit}>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter response code filter (e.g., 2xx, 200)"
        />
        <button type="submit">Search</button>
        
      </form>
      <div className='flex flex-center'>
      <button className='black_btn' onClick={handleSaveList} disabled={submitting}>
              {submitting ? 'Saving...' : 'Save List'}
      </button>
      </div>
      <div className='flex flex-center'>
        {responseCodes.length > 0 && (
          <div>
            
            <ul>
              {responseCodes.map((item) => (
                <li key={item.code}>
                  <p>{item.code}</p>
                  <img
                    src={item.imageLink}
                    alt={`HTTP ${item.code}`}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </li>
              ))}
            </ul>
            
          </div>
        )}
      </div>
      
    </div>
    </div>
  );
};

export default Search;
