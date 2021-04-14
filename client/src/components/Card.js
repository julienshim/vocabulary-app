import React, { useContext, useState, useEffect, useCallback } from 'react';
import CardsContext from '../context/cards-context';
import InlineEdit from './InlineEdit';

const Card = (props) => {
  const { card } = props;

  const { cardsDispatch } = useContext(CardsContext);

  const [deck, setDeck] = useState(card.deck);
  const [korean, setKorean] = useState(card.korean);
  const [english, setEnglish] = useState(card.english);
  const [hanja, setHanja] = useState(card.hanja || '');
  const [onmaster, setOnMaster] = useState(card.onmaster);

  const deleteButton = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: '50%',
        marginTop: '-6px',
      }}
    >
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
    </svg>
  );

  const updateCard = useCallback(
    async (card_id) => {
      try {
        const body = {
          deck,
          korean,
          english,
          hanja,
          onmaster,
        };
        const uri = `http://localhost:5000/cards/update/${card_id}`;
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        };
        const response = await fetch(uri, options);
        if (response) {
          cardsDispatch({
            type: 'EDIT_CARD',
            deck,
            korean,
            english,
            hanja,
            onmaster,
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    },
    [deck, korean, english, hanja, onmaster, cardsDispatch]
  );

  const deleteCard = async (card_id) => {
    try {
      const uri = `http://localhost:5000/cards/delete/${card_id}`;
      const options = {
        method: 'DELETE',
      };
      const response = await fetch(uri, options);
      if (response) {
        cardsDispatch({ type: 'REMOVE_CARD', card_id });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  useEffect(() => {
    updateCard(card.card_id);
  }, [card.card_id, updateCard]);

  return (
    <tr className={`${onmaster ? 'table-info ' : ''}card-row`}>
      <td>
        <div className="remove-td">
          <div className="inline-container">
            <div
              onClick={() => deleteCard(card.card_id)}
              onKeyUp={() => deleteCard(card.card_id)}
              role="button"
              tabIndex={0}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {deleteButton}
            </div>
          </div>
        </div>
      </td>
      <td className="col-width">
        <InlineEdit text={deck} setText={setDeck} />
      </td>
      <td className="col-width">
        <InlineEdit text={korean} setText={setKorean} />
      </td>
      <td className="col-width">
        <InlineEdit text={english} setText={setEnglish} />
      </td>
      <td className="col-width">
        <InlineEdit text={hanja} setText={setHanja} />
      </td>
      <td className="col-width">
        <div className="inline-container">
          <input
            type="checkbox"
            checked={onmaster}
            onChange={() => setOnMaster(!onmaster)}
          />
        </div>
      </td>
    </tr>
  );
};

export default Card;
