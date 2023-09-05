import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
 

  const CharacterDetail = () => {
    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Response is ', responseData);
        setDetail(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    CharacterDetail();
  }, []);

  return (
    <>
      <div className='detail-style'>
      {isLoading ? (
        <p>Loading data...</p>
      ) : detail ? (
        <>
          <h2>{detail.name}</h2>
          <img src={detail.image} alt={detail.name} />
          <p><strong>Status: </strong>{detail.status}</p>
          <p><strong>Species: </strong>{detail.species}</p>
          <p><strong>Gender: </strong>{detail.gender}</p>
          <p><strong>Location: </strong> {detail.location.name}</p>
        </>
      ) : (
        <p>No data available.</p>
      )}
      </div>
    </>
  );
};

export default Details;
