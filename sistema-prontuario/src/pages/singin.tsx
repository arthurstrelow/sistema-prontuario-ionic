import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import {FcGoogle} from "react-icons/fc"
import CustomButton from '../components/button/CustomButton';
import CustomInput from '../components/input/CustomInput';
import '../css/singin.css';

const SignIn: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <h2>Bem vindo!</h2>
          <div className="input-container">
            <CustomInput
              placeholder="Digite seu e-mail ou CPF"
              icon={<MdEmail className="custom-input-icon" />}
            />
            <CustomInput
              type="password"
              placeholder="Digite sua senha"
              icon={<MdLock className="custom-input-icon" />}
            />
            <a href="/forgot-password" className="forgot-link">Esqueci minha senha</a>
          </div>
          <CustomButton text="Entrar" color="#800000" />
          <div className="divider">
            <span>Ou</span>
          </div>
          <div className="social-login">
            
              <FaFacebookF size={24} color="#4267B2" />
            
              <FcGoogle size={24} color="#DB4437" />
            
          </div>
          <div className="register-link">
            <a href="/register"><span>Não tem uma conta? </span>Inscrever-se</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
