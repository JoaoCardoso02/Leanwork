import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/index.jsx';
import Input from '../Input/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalAlterContact({ clickCancel, idSelected }) {
  const dispatch = useDispatch();

  const nameContactRef = useRef(null);
  const emailContactRef = useRef(null);
  const foneContactRef = useRef(null);

  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    const contact = contacts.filter(contact => contact.id === idSelected)[0];

    setFieldsContact(fieldsContact.map(field => {
      field.defaultValue = contact[field.idName];
      return field;
    }));
  }, [])

  const [fieldsContact, setFieldsContact] = useState([
    {
      valueLabel: 'Nome Completo',
      idName: 'name',
      type: 'text',
      isRequired: true,
      ref: nameContactRef
    },
    {
      valueLabel: 'E-mail',
      idName: 'email',
      type: 'email',
      isRequired: true,
      ref: emailContactRef
    },
    {
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'number',
      isRequired: true,
      ref: foneContactRef
    }
  ]);

  const handleAlterContact = (e) => {
    e.preventDefault();
    const valueInput = {
      name: nameContactRef.current.value,
      email: emailContactRef.current.value,
      fone: Number(foneContactRef.current.value),
    };

    if (
      valueInput.name === "" ||
      valueInput.email === "" ||
      valueInput.fone === ""
    ) {
      alert('Preencha todos os campos!');
    } else {
      let isRegistred = false;

      if (contacts) {
        contacts.forEach(contact => {
          if ((contact.email === valueInput.email) && (contact.id !== Number(idSelected))) {
            emailContactRef.current.classList.add('error');
            isRegistred = true;
          }
          if ((contact.fone === valueInput.fone) && (contact.id !== Number(idSelected))) {
            foneContactRef.current.classList.add('error');
            isRegistred = true;
          }
        });
      }
      
      if (!isRegistred) {
        const newContacts = contacts.map(contact => {
          if (contact.id === Number(idSelected)) {
            contact.name = valueInput.name;
            contact.email = valueInput.email;
            contact.fone = valueInput.fone;
          }
          return contact;
        })
        dispatch({ type: 'ADD_NEW_LIST', payload: newContacts });
        clickCancel();
      }

    }
  }

  return (
    <div className="modal-alter-contact">
      <h2>Alteração de contato</h2>
      <form onSubmit={handleAlterContact}>
        <div>
          {fieldsContact.map(field => (
            <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} defaultValue={field.defaultValue} />
          ))}
        </div>
        <div className="group-buttons group-buttons-alter-contact">
          <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
          <Button divClass="confirm-alter-contact" type="submit" buttonText="Confirmar" />
        </div>
      </form>
    </div>
  );
}

ModalAlterContact.propTypes = {
  clickCancel: PropTypes.func,
  idSelected : PropTypes.number
}

export default ModalAlterContact;