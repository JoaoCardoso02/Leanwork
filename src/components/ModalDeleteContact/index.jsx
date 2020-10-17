import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalDeleteContact({ clickCancel, idSelected }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);


  const handleDelete = (e) => {
    e.preventDefault();

    const newContacts = contacts.filter(contact => contact.id !== idSelected);
    dispatch({ type: 'ADD_NEW_LIST', payload: newContacts });

    clickCancel();

  }

  return (
    <div className="modal-delete">
      <h2>Você tem certeza que quer deletá-lo?</h2>
      <form className="group-buttons group-buttons-delete" onSubmit={handleDelete}>
        <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
        <Button divClass="delete" type="submit" buttonText="Confirmar" />
      </form>
    </div>
  );
}

ModalDeleteContact.propTypes = {
  clickCancel: PropTypes.func,
  idSelect: PropTypes.number,
}

export default ModalDeleteContact;