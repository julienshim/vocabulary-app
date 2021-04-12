import React, { Fragment, useContext } from 'react';
import Card from './Card';
import CardsContext from '../context/cards-context';

const ListCards = () => {
  const { cards } = useContext(CardsContext);
  return (
    <Fragment>
      <h1>Vocabulary List</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="your-mom" />
            <th className="col-width" scope="col">
              Deck
            </th>
            <th className="col-width" scope="col">
              Korean
            </th>
            <th className="col-width" scope="col">
              English
            </th>
            <th className="col-width" scope="col">
              Hanja
            </th>
            <th className="col-width" scope="col">
              onMaster
            </th>
          </tr>
        </thead>
        <tbody>
          {cards
            ? cards.map((card) => (
                <Card key={`card-${card.card_id}`} card={card} />
              ))
            : 'No cards found'}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListCards;
