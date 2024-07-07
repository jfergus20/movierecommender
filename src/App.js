import './App.css';
import SearchBar from "./Components/SearchBar";
import Data from "./Data.json";

function App() {
  return (
    <div className="App">
      <div className='search-container'>
        <SearchBar placeholder="Search 1..." data={Data} />
        <SearchBar placeholder="Search 2..." data={Data} />
        <SearchBar placeholder="Search 3..." data={Data} />
        <SearchBar placeholder="Search 4..." data={Data} />
        <SearchBar placeholder="Search 5..." data={Data} />
      </div>
    </div>
  );
}

export default App;
