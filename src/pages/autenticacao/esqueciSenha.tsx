import React, { useState, useRef } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import CustomButton from '../../components/button/CustomButton';
import CustomInput from '../../components/input/CustomInput';
import { MdEmail } from 'react-icons/md';
import "../../css/senha_esquecida.css";
import {useHistory} from "react-router-dom";

const EsqueceuSenha: React.FC = () => {
  const emailRef = useRef('')
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/esquecisenha', {
        email_cpf: emailRef.current
      });

      const {data} = response.data

      localStorage.setItem('email', emailRef.current);
      history.push("/codigo");

      setToastMessage(data);
      setShowToast(true);
    } catch (error) {
      // @ts-ignore
      const msg = error.response === undefined ? 'Algo deu errado!' : error.response.data.data
      setToastMessage(msg)
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <h2>Esqueceu sua senha?</h2>
          <strong><p>Digite seu e-mail e enviaremos <br /> seu código de verificação</p></strong>
          <div className="form-container">
            <div className="input-container">
              <CustomInput
                placeholder="Digite seu e-mail ou CPF"
                icon={<MdEmail className="custom-input-icon" />}
                value={emailRef.current}
                onChange={(e) => emailRef.current = (e.target as HTMLInputElement).value}
              />
            </div>
            <CustomButton text="Enviar" color="#800000" onClick={handleSubmit} />
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3500}
        />
      </IonContent>
    </IonPage>
  );
};

export default EsqueceuSenha;
