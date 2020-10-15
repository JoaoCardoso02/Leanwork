import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.scss';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowRight } from 'react-icons/bs';

function Register({ changeScreen }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const foneRef = useRef(null);
  const passwordRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false)
  const [isNotSuccess, setisNotSuccess] = useState(false)


  const fields = [
    {
      valueLabel: 'Nome Completo',
      idName: 'name',
      type: 'text',
      // isRequired: true,
      ref: nameRef
    },
    {
      valueLabel: 'E-mail',
      idName: 'email',
      type: 'email',
      // isRequired: true,
      ref: emailRef
    },
    {
      valueLabel: 'CPF',
      idName: 'cpf',
      type: 'number',
      // isRequired: true,
      ref: cpfRef
    },
    {
      valueLabel: 'Telefone',
      idName: 'fone',
      type: 'number',
      // isRequired: true,
      ref: foneRef
    },
    {
      valueLabel: 'Senha',
      idName: 'password',
      type: 'password',
      // isRequired: true,
      ref: passwordRef
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueInput = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      cpf: Number(cpfRef.current.value),
      fone: Number(foneRef.current.value),
      password: passwordRef.current.value,
    };

    nameRef.current.classList.remove('error');
    emailRef.current.classList.remove('error');
    cpfRef.current.classList.remove('error');
    foneRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');

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

      const id = users.reverse()[0].id + 1;
      valueInput.id = id;

      if (!isRegistred) {
        dispatch({ type: 'ADD_USER_LIST', payload: valueInput });
        setIsSuccess(true);
        setisNotSuccess(false);
      } else {
        let textError = arrayErrors.join(', ');
        textError = textError.replace(textError[0], textError[0].toUpperCase());
        setIsSuccess(false);
        setisNotSuccess(textError);
      }
    }
    
  }

  return (
    <>
      <h2 className="title" >Lean Cadastro</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(row => (
          <Input key={row.idName} idName={row.idName} valueLabel={row.valueLabel} type={row.type} required={row.isRequired} inputRef={row.ref} />
        ))}
        <div className="group-buttons">
          <Button divClass="register button-register" type="submit" buttonText="Cadastrar" />
          <Button divClass="register button-login" type="button" buttonText="Login" icon={<BsArrowRight />} onClick={changeScreen} />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">Conta criada com sucesso!</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess} já cadastrados</h3> }
    </>
  );
}

export default Register;