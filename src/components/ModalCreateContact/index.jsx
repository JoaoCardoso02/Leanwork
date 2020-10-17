import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getID } from '../../utils/auth.js';

import Button from '../Button/index.jsx';
import Input from '../Input/index.jsx';

import './styles.scss';

import PropTypes from 'prop-types';

function ModalCreateContact({ clickCancel }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const foneRef = useRef(null);

  const handleCreateContact = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const fone = foneRef.current.value;

    let isRegistred = false;

    if (name && email && fone) {

      contacts.forEach(contact => {
        if (contact.email === email) {
          emailRef.current.classList.add('error');
          isRegistred = true;
        }
        if (contact.fone === Number(fone)) {
          foneRef.current.classList.add('error');
          isRegistred = true;
        }
      });
    } else {
      // nameRef.current.classList.add('error');
      // emailRef.current.classList.add('error');
      // foneRef.current.classList.add('error');
      alert('Preencha todos os campos!');
    }
    
    if (!isRegistred) {
      const id = contacts ? contacts.reverse()[0].id + 1 : 1;
      const data = {
        name, email, fone, id, idUser: Number(getID())
      }
      dispatch({ type: 'ADD_CONTACT_LIST', payload: data })
    }
  }

  const fieldsCreateContact = [
    {
      valueLabel: 'Nome',
      idName: 'name',
      type: 'text',
      isRequired: true,
      ref: nameRef
    },
    {
      valueLabel: 'E-mail',
      idName: 'email',
      type: 'email',
      isRequired: true,
      ref: emailRef
    },
    {
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'number',
      isRequired: true,
      ref: foneRef
    }
  ];

  return (
    <div className="modal-create-contact">
      <h2>Criação de contato</h2>
      <form onSubmit={handleCreateContact}>
        <div>
          {fieldsCreateContact.map(field => (
            <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} defaultValue={field.defaultValue} />
          ))}
        </div>
        <div className="group-buttons group-buttons-create-contact">
          <Button divClass="cancel" type="button" buttonText="Cancelar" onClick={clickCancel} />
          <Button divClass="confirm-create-contact" type="submit" buttonText="Confirmar" />
        </div>
      </form>
    </div>
  );
}

ModalCreateContact.propTypes = {
  clickCancel: PropTypes.func,
}

export default ModalCreateContact;