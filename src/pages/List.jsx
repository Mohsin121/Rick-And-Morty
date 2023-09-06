import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    alive: false,
    dead: false,
    unknown: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }

  const handleCheckbox = (name) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const getCharacters = () => {
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
    getCharacters();
  }, []);

  const filterByStatus = characters.filter((character) => {
    if (checkboxes.alive && character.status === 'Alive') {
      return true;
    }
    if (checkboxes.dead && character.status === 'Dead') {
      return true;
    }
    if (checkboxes.unknown && character.status === 'unknown') {
      return true;
    }
    return false;
  });

  const filteredCharacters = characters
    .filter((character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredAndSortedCharacters =
    checkboxes.alive || checkboxes.dead || checkboxes.unknown
      ? filterByStatus
      : filteredCharacters;

  return (
    <>
      <div className="container">
        <h1 className="title">Rick and Morty</h1>

        <div className="input-container">
          <div className="d-flex align-items-center flex-wrap gap-5 mb-4">
            <div className="d-flex flex-column">
              <h3 className="section-title">Search by Title</h3>

              <input
                type="text"
                className="input-size mb-0"
                value={searchText}
                onChange={handleChange}
                placeholder="Search by name"
              />
            </div>

            <div className="input-container mt-0">
              <h3 className="section-title">Search by Status</h3>
              <div className="checkbox ">
                <label>
                  <input
                    type="checkbox"
                    name="alive"
                    value="alive"
                    checked={checkboxes.alive}
                    onChange={() => handleCheckbox('alive')}
                  />
                  Alive
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="dead"
                    value="dead"
                    checked={checkboxes.dead}
                    onChange={() => handleCheckbox('dead')}
                  />
                  Dead
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="unknown"
                    value="unknown"
                    checked={checkboxes.unknown}
                    onChange={() => handleCheckbox('unknown')}
                  />
                  Unknown
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>Episodes</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCharacters.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/details/${item.id}`}>
                    <span>{item.name}</span>
                  </Link>
                </td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    height={50}
                    width={50}
                  />
                </td>
                <td>{item.status}</td>
                <td>{item.episode.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default List;
