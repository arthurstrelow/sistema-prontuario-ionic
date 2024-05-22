import React from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import CustomButton from '../components/button/CustomButton';
import '../css/confirm.css';
import {useHistory} from "react-router-dom";

const confirmacaoSenha: React.FC = () => {
    const history = useHistory();

    const redirect = () => {
        history.push('/entrar')
    }


    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div className="confirmation-container">
                    <IonText color="danger">
                        <h2>Confirmação</h2>
                    </IonText>
                    <IonIcon icon={checkmarkCircle} className="success-icon" />
                    <IonText color="dark">
                        <h3>Senha alterada com sucesso</h3>
                        <p>Parabéns, sua nova senha foi registrada com sucesso!</p>
                    </IonText>
                    <CustomButton text="Voltar para o ínicio" color="#800000" onClick={redirect}/>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default confirmacaoSenha;
