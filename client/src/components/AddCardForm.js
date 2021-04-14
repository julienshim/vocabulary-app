import React, { Fragment, useState, useContext } from 'react';
import CardsContext from '../context/cards-context';

const AddCardForm = () => {
  const { cards, cardsDispatch, totalCards, setTotalCards } = useContext(
    CardsContext
  );

  const [deck, setDeck] = useState('');
  const [korean, setKorean] = useState('');
  const [english, setEnglish] = useState('');
  const [hanja, setHanja] = useState('');
  const [onMaster, setOnMaster] = useState(false);

  const addButton = (
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
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
    </svg>
  );

  const addCard = async (e) => {
    // eslint-disable-next-line no-console
    e.preventDefault();
    try {
      const body = {
        deck,
        korean,
        english,
        hanja,
        onMaster: !!onMaster,
      };
      const uri = 'http://localhost:5000/cards/add';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(uri, options);
      const jsonData = await response.json();
      if (response) {
        cardsDispatch({
          type: 'ADD_CARD',
          card_id: jsonData.card_id,
          deck,
          korean,
          english,
          hanja,
          onMaster: !!onMaster,
        });
      }
      setDeck(Math.ceil(cards.length / 30));
      setKorean('');
      setEnglish('');
      setHanja('');
      setOnMaster(false);
      setTotalCards(totalCards + 1);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={addCard}>
        <table
          className="table table-hover"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <tbody>
            <tr>
              <td>
                <div className="add-td">
                  <div className="inline-container">
                    <div
                      onClick={(e) => addCard(e)}
                      onKeyUp={(e) => addCard(e)}
                      role="button"
                      tabIndex={0}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {addButton}
                    </div>
                  </div>
                </div>
              </td>
              <td className="col-width">
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                  />
                </div>
              </td>
              <td className="col-width">
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={korean}
                    onChange={(e) => setKorean(e.target.value)}
                  />
                </div>
              </td>
              <td className="col-width">
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                  />
                </div>
              </td>
              <td className="col-width">
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={hanja}
                    onChange={(e) => setHanja(e.target.value)}
                  />
                </div>
              </td>
              <td className="col-width">
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={onMaster}
                    onChange={() => setOnMaster(!onMaster)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Fragment>
  );
};

export default AddCardForm;
