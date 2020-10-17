import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal/index.jsx';
import ModalAlterPassword from '../../components/ModalAlterPassword/index.jsx';
import ModalDeleteContact from '../../components/ModalDeleteContact/index.jsx';
import ModalAlterContact from '../../components/ModalAlterContact/index.jsx';

import Header from '../../components/Header/index.jsx';
import DataUser from '../../components/DataUser/index.jsx';
import ListContacts from '../../components/ListContacts/index.jsx';

import './styles.scss';

function Main() {

  const [modal, setModal] = useState(false);
  const [idSelected, setIdSelected] = useState(false);

  const contacts = useSelector(state => state.contacts);



  const openModalDelete = (id) => {
    setIdSelected(id);
    setModal('delete');
  }

  const openModalAlterContact = (id) => {
    setIdSelected(id);
    setModal('alterContact');
  }

  return (
    <>
      <div className="container-main">
        <Header />
        <div className="content">
          <div className="my-data">
            <DataUser setModal={(value) => setModal(value)} />
          </div>
          <div className="list-contacts">
            <ListContacts contacts={contacts} openModalAlterContact={(id) => openModalAlterContact(id)} openModalDelete={(id) => openModalDelete(id)} />
          </div>
        </div>
      </div>
      {modal === 'delete' && 
      <Modal borderColor='#d94d4d'>
        <ModalDeleteContact clickCancel={() => {setModal(false); setIdSelected(false);}} idSelected={idSelected} />
      </Modal>}

      {modal === 'alterContact' && 
      <Modal borderColor='#2db92d'>
        <ModalAlterContact clickCancel={() => {setModal(false); setIdSelected(false);}} idSelected={idSelected} />
      </Modal>}

      {modal === 'alterPassword' && 
      <Modal borderColor='#2db92d'>
        <ModalAlterPassword clickCancel={() => {setModal(false); setIdSelected(false);}} />
      </Modal>}

    </>
  );
}

export default Main;