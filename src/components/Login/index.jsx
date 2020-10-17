import React, { useRef, useState } from 'react';
import { getUsers } from '../../utils/users.js';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowLeft } from 'react-icons/bs';

import { login } from '../../utils/auth.js';

import './styles.scss';

import PropTypes from 'prop-types';

function Login({ changeScreen }) {
  const [users, setUsers] = useState(getUsers());
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false)
  const [isNotSuccess, setisNotSuccess] = useState(false)

  const history = useHistory();

  const fields = [
    {
      valueLabel: 'E-mail',
      idName: 'email',
      type: 'email',
      isRequired: true,
      ref: emailRef
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
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    emailRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');

    if (
      valueInput.email === "" ||
      valueInput.password === ""
    ) {
      setisNotSuccess('Preencha todos os campos!');
    } else {
      const user = users.filter(value => value.email === valueInput.email && value.password === valueInput.password);
      if (user.length) {
        login(user[0].id);
        setIsSuccess(true);
        history.push('/main');
      } else {
        setisNotSuccess('E-mail ou senha incorretos!');
      }
    }
  }

  return (
    <>
      <h2 className="title" >Lean Login</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(row => (
          <Input key={row.idName} idName={row.idName} valueLabel={row.valueLabel} type={row.type} required={row.isRequired} inputRef={row.ref} />
        ))}
        <div className="group-buttons">
          <Button divClass="login button-register" type="button" buttonText="Cadastrar" icon={<BsArrowLeft />} onClick={changeScreen} />
          <Button divClass="login button-login" type="submit" buttonText="Login" />
        </div>
      </form>
      { isSuccess && <h3 className="textSuccess">Login realizado com sucesso!</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess}</h3> }
    </>
  );
}

Login.propTypes = {
  changeScreen: PropTypes.func,
}

export default Login;