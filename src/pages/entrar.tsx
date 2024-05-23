import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import CustomButton from '../components/button/CustomButton';
import CustomInput from '../components/input/CustomInput';
import '../css/singin.css';

const Entrar: React.FC = () => {
  const [email, setEmail] = useState('');
  const senhaRef = useRef('')
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    try {

      const response = await axios.post('http://localhost:3000/api/entrar', {
        email_cpf: email,
        senha: senhaRef.current
      })
      const {data, token} = response.data

      localStorage.setItem('token', token);
      history.push("/inicio");

      setToastMessage(data);
      setShowToast(true);

    } catch (error) {
      // @ts-ignore
      const msg = error.response === undefined ? 'Algo deu errado!' : e.response.data.data
      setToastMessage(msg)
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <h2>Bem vindo!</h2>
          <div className="input-container">
            <CustomInput
              placeholder="Digite seu e-mail ou CPF"
              icon={<MdEmail className="custom-input-icon" />}
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
            <CustomInput
              type='password'
              placeholder="Digite sua senha"
              icon={<MdLock className="custom-input-icon" />}
              value={senhaRef.current}
              onChange={(e) => senhaRef.current = (e.target as HTMLInputElement).value}
            />
            <a href="/esqueceu-senha" className="forgot-link">Esqueci minha senha</a>
          </div>
          <CustomButton text="Entrar" color="#800000" onClick={handleSubmit} />
          <div className="divider">
            <span>Ou</span>
          </div>
          <div className="social-login">
            <FaFacebookF size={24} color="#4267B2" />
            <FcGoogle size={24} color="#DB4437" />
          </div>
          <div className="register-link">
            <a href="/"><span>Não tem uma conta? </span>Inscrever-se</a>
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

export default Entrar;