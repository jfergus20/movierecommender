import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar";
import Recommend from "./Components/Recommend";
import Data from "./Data.json";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelect = (item) => {
    setSelectedItems(prevItems => {
      // Check if the item is already in the list
      if (!prevItems.some(prevItem => prevItem.title === item.title)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  return (
    <div className="App">
      <div className='search-container'>
        <SearchBar placeholder="Search 1..." data={Data} onItemSelect={handleItemSelect} />
        <SearchBar placeholder="Search 2..." data={Data} onItemSelect={handleItemSelect} />
        <SearchBar placeholder="Search 3..." data={Data} onItemSelect={handleItemSelect} />
        <SearchBar placeholder="Search 4..." data={Data} onItemSelect={handleItemSelect} />
        <SearchBar placeholder="Search 5..." data={Data} onItemSelect={handleItemSelect} />
      </div>
      <div>
        <h2>Selected Items:</h2>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
      <Recommend selectedItems={selectedItems} />
    </div>
  );
}

export default App;