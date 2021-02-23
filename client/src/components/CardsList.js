import React, { Fragment, useContext } from 'react';
import Card from './Card';
import CardsContext from '../context/cards-context';

const ListCards = () => {
  const { cards } = useContext(CardsContext);
  return (
    <Fragment>
      <h1>Vocabulary List</h1>
      <table>
        <thead>
          <tr>
            <th>Deck</th>
            <th>Korean</th>
            <th>English</th>
            <th>Hanja</th>
            <th>onMaster</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
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
