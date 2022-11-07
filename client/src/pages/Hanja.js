import React, { useMemo } from 'react';

// components
import Loader from '../components/Loader';
import ListHanja from '../components/ListHanja';

// hooks
import useGetCards from '../hooks/useGetCards';

// context
import CardsContext from '../context/cards-context';

const Hanja = () => {
  const { cards, isLoading } = useGetCards();

  if (isLoading) {
    return <Loader />;
  }

  const cardsContextProviderValue = useMemo(
    () => ({
      cards,
    }),
    [cards]
  );

  return (
    <CardsContext.Provider value={cardsContextProviderValue}>
      <ListHanja />
    </CardsContext.Provider>
  );
};

export default Hanja;
