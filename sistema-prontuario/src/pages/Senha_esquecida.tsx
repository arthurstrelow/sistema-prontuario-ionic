import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import CustomButton from '../components/button/CustomButton';
import CustomInput from '../components/input/CustomInput';
import { MdEmail } from 'react-icons/md';
import "../css/senha_esquecida.css";

const EsqueceuSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/resetarminhasenhazinhaaaa', {
        email_cpf: email
      });
      // Handle success response
      setToastMessage('E-mail de recuperação enviado com sucesso!');
      setShowToast(true);
    } catch (error) {
      // Handle error response
      setToastMessage('Erro ao enviar e-mail de recuperação. Por favor, tente novamente.');
      setShowToast(true);
      console.error(error);
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
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              />
            </div>
            <CustomButton text="Enviar" color="#800000" onClick={handleSubmit} />
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default EsqueceuSenha;
