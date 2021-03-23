import React from 'react';

// components
import AddCardForm from '../components/AddCardForm';
import CardsList from '../components/CardsList';
import PageNavigation from '../components/PageNavigation';
import Loader from '../components/Loader';
import useGetCards from '../hooks/useGetCards';

// context
import CardsContext from '../context/cards-context';

function VocabularyList() {
  const {
    cards,
    cardsDispatch,
    isLoading,
    cardsPerPage,
    totalCards,
    currentPage,
    setCurrentPage,
    previous,
    next,
  } = useGetCards();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        cardsDispatch,
        isLoading,
        cardsPerPage,
        totalCards,
        currentPage,
        next,
        previous,
        setCurrentPage,
      }}
    >
      <CardsList />
      <AddCardForm />
      <PageNavigation />
    </CardsContext.Provider>
  );
}

export default VocabularyList;
