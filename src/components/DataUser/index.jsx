import React, { useEffect, useRef, useState } from 'react';
import { getUsers, alterPassword, modifyDataUser } from '../../utils/users.js';
import { getID } from '../../utils/auth.js';

import './styles.scss';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import PropTypes from 'prop-types';

function DataUser({ setModal }) {

  const [users, setUsers] = useState(getUsers());

  const [isSuccess, setIsSuccess] = useState(false)
  const [isNotSuccess, setisNotSuccess] = useState(false)

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const foneRef = useRef(null);

  const fields = [
    {
      valueLabel: 'Nome Completo',
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
      valueLabel: 'CPF',
      idName: 'cpf',
      type: 'number',
      isRequired: true,
      ref: cpfRef
    },
    {
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'number',
      isRequired: true,
      ref: foneRef
    }
  ];

  useEffect(() => {
    const id = getID();
    const userLogged = users.filter(user => user.id === Number(id))[0];
    
    nameRef.current.value = userLogged.name;
    emailRef.current.value = userLogged.email;
    cpfRef.current.value = userLogged.cpf;
    foneRef.current.value = userLogged.fone;
    
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueInput = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      cpf: Number(cpfRef.current.value),
      fone: Number(foneRef.current.value),
    };

    if (
      valueInput.name === "" ||
      valueInput.email === "" ||
      valueInput.cpf === "" ||
      valueInput.fone === "" ||
      valueInput.password === ""
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      let isRegistred = false;
      let arrayErrors = [];

      if (users) {
        users.forEach(value => {
          if ((value.email === valueInput.email) && (value.id !== Number(getID()))) {
            emailRef.current.classList.add('error');
            isRegistred = true;
            arrayErrors.push('email');
          }
          if ((value.cpf === valueInput.cpf) && (value.id !== Number(getID()))) {
            cpfRef.current.classList.add('error');
            isRegistred = true;
            arrayErrors.push('cpf');
          }
          if ((value.fone === valueInput.fone) && (Number(value.id) !== Number(getID()))) {
            foneRef.current.classList.add('error');
            isRegistred = true;
            arrayErrors.push('telefone');
          }
        });
      }
    
      if (isRegistred) {
        let textError = arrayErrors.join(', ');
        textError = textError.replace(textError[0], textError[0].toUpperCase()) + ' já cadastrado(s)';
        setIsSuccess(false);
        setisNotSuccess(textError);
      } else {
        modifyDataUser(getID(), valueInput);
        setIsSuccess('Alterado com sucesso!');
      }
    }
  }


  return (
    <div className="my-data-content">
      <h2 className="title-main">Meus dados</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} />
        ))}
        <div className="group-buttons">
          <Button divClass="alterData button-alter-password" type="button" buttonText="Alterar senha" onClick={() => setModal('alterPassword')} />
          <Button divClass="alterData button-finish" type="submit" buttonText="Concluir" />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">{isSuccess}</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </div>
  );
}

DataUser.propTypes = {
  setModal: PropTypes.func,
}


export default DataUser;