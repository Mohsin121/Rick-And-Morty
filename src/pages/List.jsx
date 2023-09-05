import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }

  const getCharcters = () => {
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Response is ', responseData);

        setCharacters(responseData.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCharcters();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2 className="title">Search by Title</h2>
      <div className="input-container">
        <input
          type="text"
          className="input-size"
          value={searchText}
          onChange={handleChange}
          placeholder="Search by name"
        />
      </div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div className="card-container">
          {filteredCharacters.map((item) => (
            <div className="card" key={item.id}>
              {' '}
              <Link to={`/details/${item.id}`}>
                {' '}
                <h2 className="item-name"><span>{item.name}</span></h2>
              </Link>
              <img src={item.image} alt={item.name} />
              <p><strong>Status: </strong>{item.status}</p>
              <p><strong>Episodes: </strong>{item.episode.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
