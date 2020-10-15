import React, { useCallback, useState } from 'react';
import Register from '../../components/Register/index.jsx';
import Login from '../../components/Login/index.jsx';

import './styles.scss';


function Home() {
  const [isRegisterScreen, setIsRegisterScreen] = useState(true);

  const changeScreen = useCallback(() => setIsRegisterScreen(!isRegisterScreen), [isRegisterScreen]);
  return (
    <div className="container">
      <div className="div-image" />
      <div className="form">
        <div className="content-form">
          {isRegisterScreen ? <Register changeScreen={changeScreen} /> : <Login changeScreen={changeScreen} />}
        </div>
      </div>
    </div>
  );
}

export default Home;