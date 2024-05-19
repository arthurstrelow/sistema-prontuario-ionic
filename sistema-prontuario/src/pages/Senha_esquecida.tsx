import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CustomButton from '../components/button/CustomButton';
import CustomInput from '../components/input/CustomInput';
import { MdEmail } from 'react-icons/md';
import "../css/senha_esquecida.css"

const EsqueceuSenha: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar pedido de redefinição de senha
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <h2>Esqueceu sua senha?</h2>
          <strong><p>Digite seu e-mail e enviaremos <br /> seu código de verificação</p></strong>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <CustomInput
                placeholder="Digite seu email"
                icon={<MdEmail />}
              />
              <CustomButton text="Enviar" color="#800000"  />
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EsqueceuSenha;
