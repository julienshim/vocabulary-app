import React, { Fragment, useContext } from 'react';
import Reference from './Reference';
import ReferenceContext from '../context/reference-context';

const ListReference = () => {
  const { reference } = useContext(ReferenceContext);
  // eslint-disable-next-line no-console
  console.log(reference, 'boom');
  return (
    <Fragment>
      <h1>Reference</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            <th className="col-width" scope="col">
              Korean
            </th>
            <th className="col-width" scope="col">
              English
            </th>
            <th className="col-width" scope="col">
              Hanja
            </th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            {/* <th className="col-width" scope="col">
              onMaster
            </th> */}
          </tr>
        </thead>
        <tbody>
          {reference
            ? reference.map((referi) => (
                <Reference key={`referi-${referi.card_id}`} referi={referi} />
              ))
            : 'No reference found'}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListReference;
