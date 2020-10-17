import React, { useEffect, useRef, useState } from 'react';
import { getUsers, insertUser } from '../../utils/users.js';

import './styles.scss';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowRight } from 'react-icons/bs';

import PropTypes from 'prop-types';

function Register({ changeScreen }) {
  const [users, setUsers] = useState(getUsers())
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const foneRef = useRef(null);
  const passwordRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotSuccess, setisNotSuccess] = useState(false);

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
      type: 'text',
      isRequired: true,
      ref: cpfRef,
      maxLength: 14,
      minLength: 14,
      onChange: function(input) {
        let value = input.target.value;
        value = value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')

        input.target.value = value;
      }
    },
    {
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'number',
      isRequired: true,
      ref: foneRef
    },
    {
      valueLabel: 'Senha',
      idName: 'password',
      type: 'password',
      isRequired: true,
      ref: passwordRef
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueInput = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      cpf: cpfRef.current.value,
      fone: Number(foneRef.current.value),
      password: passwordRef.current.value,
    };

    nameRef.current.classList.remove('error');
    emailRef.current.classList.remove('error');
    cpfRef.current.classList.remove('error');
    foneRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');
    
    if (
      !valueInput.name ||
      !valueInput.email ||
      Number(valueInput.cpf.length) !== 14 ||
      !valueInput.fone ||
      !valueInput.password
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      console.log(valueInput.cpf.length == 14)
      let isRegistred = false;
      let arrayErrors = [];

      if (users) {
        users.forEach(value => {
          if (value.email === valueInput.email) {
            emailRef.current.classList.add('error');
            isRegistred = true;
            arrayErrors.push('email');
          }
          if (value.cpf === valueInput.cpf) {
            cpfRef.current.classList.add('error');
            isRegistred = true;
            arrayErrors.push('cpf');
          }
          if (value.fone === valueInput.fone) {
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
        if (users && users.length) {
          const id = users.reverse()[0].id + 1;
          valueInput.id = id;
        } else {
          valueInput.id = 1;
        }
        insertUser(valueInput);
        setIsSuccess(true);
        setisNotSuccess(false);
        setUsers(getUsers());
      }
    }
    
  }

  return (
    <>
      <h2 className="title" >Lean Cadastro</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <Input key={field.idName} idName={field.idName} valueLabel={field.valueLabel} type={field.type} required={field.isRequired} inputRef={field.ref} maxLength={field.maxLength ? field.maxLength : null} minLength={field.minLength ? field.minLength : null}  onChange={field.onChange ? field.onChange : null} />
        ))}
        <div className="group-buttons">
          <Button divClass="register button-register" type="submit" buttonText="Cadastrar" />
          <Button divClass="register button-login" type="button" buttonText="Login" icon={<BsArrowRight />} onClick={changeScreen} />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">Conta criada com sucesso!</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </>
  );
}



export default Register;