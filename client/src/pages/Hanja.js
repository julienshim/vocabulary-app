import React from 'react';

// components
import Loader from '../components/Loader';
import HanjaList from '../components/HanjaList';

// hooks
import useGetCards from '../hooks/useGetCards';

// context
import CardsContext from '../context/cards-context';

const Hanja = () => {
  const { cards, isLoading } = useGetCards();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
      }}
    >
      <HanjaList />
    </CardsContext.Provider>
  );
};

export default Hanja;
