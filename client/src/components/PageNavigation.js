/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import CardsContext from '../context/cards-context';
import Loader from './Loader';

const PageNavigation = () => {
  const {
    totalCards,
    cardsPerPage,
    setCurrentPage,
    currentPage,
    previous,
    next,
    isLoading,
  } = useContext(CardsContext);

  let pageNumbers = [];

  const lastPage = Math.ceil(totalCards / cardsPerPage);

  if (lastPage > 2) {
    for (let i = 2; i < lastPage; i += 1) {
      pageNumbers.push(i);
    }
  }

  if (lastPage > 5) {
    if (currentPage < 5) {
      if (currentPage === 4 && lastPage < 8) {
        pageNumbers = pageNumbers.slice(0, 5);
      } else {
        pageNumbers = pageNumbers.slice(0, 4);
      }
    } else if (currentPage > lastPage - 4) {
      pageNumbers = pageNumbers.slice(lastPage - 6);
    } else {
      pageNumbers = pageNumbers.slice(currentPage - 4, currentPage + 1);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${previous === null ? ' disabled' : ''}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="page-link"
            role="button"
            tabIndex={previous === null ? 0 : -1}
            onClick={() => setCurrentPage(currentPage - 1)}
            onKeyUp={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        <li
          className={`page-item ${
            // eslint-disable-next-line no-nested-ternary
            currentPage === 1
              ? totalCards <= cardsPerPage
                ? ' disabled'
                : ' active'
              : ''
          }`}
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="page-link"
            onClick={() => setCurrentPage(1)}
            onKeyUp={() => setCurrentPage(1)}
            role="button"
            tabIndex={0}
          >
            {1}
          </a>
        </li>
        {lastPage > 6 && currentPage > 4 && (
          <li className="page-item disabled">
            <a className="page-link">...</a>
          </li>
        )}
        {pageNumbers.map((number) => {
          const isCurrentPage = number === currentPage;
          return (
            <li className={`page-item ${isCurrentPage && ' active'}`}>
              <a
                className="page-link"
                onClick={() => setCurrentPage(number)}
                onKeyUp={() => setCurrentPage(number)}
                role="button"
                tabIndex={0}
              >
                {number}
              </a>
            </li>
          );
        })}
        {(lastPage > 6 || currentPage > 5) && currentPage < lastPage - 3 && (
          <li className="page-item disabled">
            <a className="page-link">...</a>
          </li>
        )}
        {totalCards > 1 && lastPage !== 1 && (
          <li className={`page-item ${currentPage === lastPage && ' active'}`}>
            <a
              className="page-link"
              onClick={() => setCurrentPage(lastPage)}
              onKeyUp={() => setCurrentPage(lastPage)}
              role="button"
              tabIndex={0}
            >
              {lastPage}
            </a>
          </li>
        )}
        <li className={`page-item ${next === null ? ' disabled' : ''}`}>
          <a
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
            onKeyUp={() => setCurrentPage(currentPage + 1)}
            role="button"
            tabIndex={next === null ? 0 : -1}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
