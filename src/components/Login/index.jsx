import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.scss';

import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';

import { BsArrowLeft } from 'react-icons/bs';

function Login({ changeScreen }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false)
  const [isNotSuccess, setisNotSuccess] = useState(false)


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
      ref: nameRef
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    // const valueInput = {
    //   name: nameRef.current.value,
    //   email: emailRef.current.value,
    //   cpf: Number(cpfRef.current.value),
    //   fone: Number(foneRef.current.value),
    // };

    // nameRef.current.classList.remove('error');
    // emailRef.current.classList.remove('error');
    // cpfRef.current.classList.remove('error');
    // foneRef.current.classList.remove('error');

    // if (
    //   valueInput.name === "" ||
    //   valueInput.email === "" ||
    //   valueInput.cpf === "" ||
    //   valueInput.fone === ""
    // ) {
    //   // alert('Preencha todos os campos')
    //   setisNotSuccess('Preencha todos os campos!');
    // } else {

    //   let isRegistred = false;
    //   let arrayErrors = [];
    //   users.forEach(value => {
    //     if (value.email === valueInput.email) {
    //       emailRef.current.classList.add('error');
    //       isRegistred = true;
    //       arrayErrors.push('email');
    //     }
    //     if (value.cpf === valueInput.cpf) {
    //       cpfRef.current.classList.add('error');
    //       isRegistred = true;
    //       arrayErrors.push('cpf');
    //     }
    //     if (value.fone === valueInput.fone) {
    //       foneRef.current.classList.add('error');
    //       isRegistred = true;
    //       arrayErrors.push('telefone');
    //     }
    //   });

    //   const id = users.reverse()[0].id + 1;
    //   valueInput.id = id;

    //   if (!isRegistred) {
    //     dispatch({ type: 'ADD_USER_LIST', payload: valueInput });
    //     setIsSuccess(true);
    //     setisNotSuccess(false);
    //   } else {
    //     let textError = arrayErrors.join(', ');
    //     textError = textError.replace(textError[0], textError[0].toUpperCase());
    //     setIsSuccess(false);
    //     setisNotSuccess(textError);
    //   }
    // }
    
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
      { isSuccess && <h3 className="textSuccess">Conta criada com sucesso!</h3> }
      { isNotSuccess && <h3 className="textError">{isNotSuccess} já cadastrados</h3> }
    </>
  );
}

export default Login;