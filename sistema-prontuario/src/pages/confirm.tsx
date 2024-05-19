import React from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import CustomButton from '../components/button/CustomButton';
import '../css/confirm.css';

const Confirmation: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="confirmation-container">
          <IonText color="danger">
            <h2>Confirmação</h2>
          </IonText>
          <IonIcon icon={checkmarkCircle} className="success-icon" />
          <IonText color="dark">
            <h3>Registrado com sucesso</h3>
            <p>Parabéns, sua nova senha foi registrada com sucesso!</p>
          </IonText>
          <CustomButton text="Obrigado!!" color="#800000" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Confirmation;
