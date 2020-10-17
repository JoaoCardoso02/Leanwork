import React from 'react';
import { getID } from '../../utils/auth';

import './styles.scss';

import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri';
import { BsPlusCircle } from 'react-icons/bs';

import PropTypes from 'prop-types';

function ListContacts({ contacts, openModalAlterContact, openModalDelete, openModalCreateContact }) {
  return (
    <div className="list-contacts-content">
      <h2 className="title-main">Meus contatos <BsPlusCircle onClick={openModalCreateContact} /></h2>
      <div className="list">
        <ul>
          <li className="li-title">
            <div className="div-titles">
              <h3>Nome</h3>
              <h3>E-mail</h3>
              <h3>Telefone</h3>
            </div>
          </li>
          {contacts.map((contact, index) => ( contact.idUser === Number(getID()) &&
            <li className='li-data' key={index}>
              <div className="data-contact-list">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.fone}</p>
              </div>
              <div className="options">
                <RiPencilLine className="pencil" onClick={() => openModalAlterContact(contact.id)}/>
                <RiDeleteBin5Line onClick={() => openModalDelete(contact.id)} className="delete" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ListContacts.propTypes = {
  contacts: PropTypes.array,
  openModalAlterContact: PropTypes.func,
  openModalDelete: PropTypes.func
}

export default ListContacts;