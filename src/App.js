import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Install axios for fetching data


function App() {
  const [textFiles, setTextFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]); // State for filtered files
  const [searchText, setSearchText] = useState(''); // State for search input


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/text-files'); // Adjust URL if needed
        setTextFiles(response.data);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately, e.g., display an error message
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const filtered = textFiles.filter((file) => {
      const regex = new RegExp(searchText, 'i'); // Case-insensitive search
      return regex.test(file);
    });
    setFilteredFiles(filtered);
  }, [searchText, textFiles]);


  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Files"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <nav className="sidebar">
        <h2>Directory Contents</h2>
        <ul>
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <li key={file}>{file}</li>
            ))
          ) : (
            <li>No files found</li>
          )}
        </ul>
      </nav>
      {/* Rest of your app content here */}
    </div>
  );
}

export default App;
