import React, { useEffect, useReducer, useState } from 'react';

// components
import AddCardForm from './AddCardForm';
import CardsList from './CardsList';

// reducers
import cardsReducer from '../reducers/cardsReducers';

// context
import CardsContext from '../context/cards-context';

function VocabularyList() {
  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(30);
  // eslint-disable-next-line no-unused-vars
  const [next, setNext] = useState();
  // eslint-disable-next-line no-unused-vars
  const [previous, setPrevious] = useState();

  const getCards = async () => {
    try {
      const uri = `http://localhost:5000/cards?page=${currentPage}&limit=${postsPerPage}`;
      const response = await fetch(uri);
      const jsonData = await response.json();
      setNext(jsonData.next);
      setPrevious(jsonData.previous);
      cardsDispatch({ type: 'POPULATE_CARDS', cards: jsonData.results || [] });
    } catch (err) {
      console.error(err.messsage);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        cardsDispatch,
      }}
    >
      <CardsList
        setCurrentPage={setCurrentPage}
        setPostsPerPage={postsPerPage}
      />
      <AddCardForm />
    </CardsContext.Provider>
  );
}

export default VocabularyList;
