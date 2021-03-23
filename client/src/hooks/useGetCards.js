import { useState, useEffect, useReducer } from 'react';
import cardsReducer from '../reducers/cardsReducers';

const useGetCards = () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(null);
  const [totalCards, setTotalCards] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const getCards = async () => {
    try {
      const uri = `http://localhost:5000/cards?page=${currentPage}&limit=${cardsPerPage}`;
      const response = await fetch(uri);
      const parseRes = await response.json();
      setPrevious(parseRes.previous ? parseRes.previous : null);
      setNext(parseRes.next ? parseRes.next : null);
      setTotalCards(parseRes.total_cards);
      cardsDispatch({ type: 'POPULATE_CARDS', cards: parseRes.results || [] });
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.messsage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, [currentPage, totalCards]);

  return {
    cards,
    cardsDispatch,
    currentPage,
    setCurrentPage,
    cardsPerPage,
    setCardsPerPage,
    totalCards,
    setTotalCards,
    next,
    setNext,
    previous,
    setPrevious,
    isLoading,
  };
};

export default useGetCards;
