import { useState, useEffect, useReducer } from 'react';
import referenceReducer from '../reducers/referenceReducer';

const useGetReference = () => {
  const [reference, referenceDispatch] = useReducer(referenceReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [referencePerPage, setReferencePerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(null);
  const [totalReference, setTotalReference] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const getReference = async () => {
    try {
      const uri = `http://localhost:5000/reference?page=${currentPage}&limit=${referencePerPage}`;
      const response = await fetch(uri);
      const parseRes = await response.json();
      setPrevious(parseRes.previous ? parseRes.previous : null);
      setNext(parseRes.next ? parseRes.next : null);
      setTotalReference(parseRes.total_cards);
      referenceDispatch({
        type: 'POPULATE_REFERENCE',
        reference: parseRes.results || [],
      });
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.messsage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReference();
  }, [currentPage, totalReference]);

  return {
    reference,
    referenceDispatch,
    currentPage,
    setCurrentPage,
    referencePerPage,
    setReferencePerPage,
    totalReference,
    setTotalReference,
    next,
    setNext,
    previous,
    setPrevious,
    isLoading,
  };
};

export default useGetReference;
