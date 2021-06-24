import React, { useContext } from 'react';
import CardsContext from '../context/cards-context';

const ListHanja = () => {
  const { cards } = useContext(CardsContext);
  // eslint-disable-next-line no-console
  console.log(cards.map((x) => x.hanja).filter((x) => x.trim()));
  return (
    <div>
      <ul>
        {cards
          ? // eslint-disable-next-line react/no-array-index-key
            cards.map((x, index) => (
              <li key={`hl-li-${index * Date.now()}`}>{x.hanja}</li>
            ))
          : 'Hanja not found'}
      </ul>
    </div>
  );
};

export default ListHanja;
