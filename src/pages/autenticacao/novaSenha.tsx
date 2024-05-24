import React, {useState, useRef, useEffect} from 'react';
import '../../css/NovaSenha.css';
import {useHistory} from "react-router-dom";
import { IonContent, IonPage, IonToast } from '@ionic/react';
import axios from "axios";
import CustomInput from "../../components/input/CustomInput";
import {MdLock} from "react-icons/md";
import CustomButton from "../../components/button/CustomButton";

const NovaSenha: React.FC = () => {
  const senhaRef = useRef('')
  const senhadenovoRef = useRef('')
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem('email')) history.push('/entrar')
    if(!localStorage.getItem('codigo')) history.push('/entrar')
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = localStorage.getItem('email')
    const codigo = localStorage.getItem('codigo')

    if(senhaRef.current !== senhadenovoRef.current){
      setToastMessage('As senhas fornecidas não coincidem. Por favor, verifique e tente novamente.')
      setShowToast(true);
    }else{
      try{
        const request = await axios.post('http://localhost:3000/api/resetarsenha', {
          'email_cpf': email,
          'codigo': codigo,
          'senha': senhaRef.current
        })
        setToastMessage(request.data.data)
        setShowToast(true);
        history.push('/confirmacao-senha')
      }catch (error){
        // @ts-ignore
        const msg = error.response === undefined ? 'Algo deu errado!' : error.response.data.data
        setToastMessage(msg)
        setShowToast(true);
        history.push('/entrar')
      }finally {
        localStorage.clear()
      }
    }
  };

  return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="container">
            <h2>Trocar a senha</h2>
            <div className="input-container">
              <CustomInput
                  type='password'
                  placeholder="Digite sua senha"
                  icon={<MdLock className="custom-input-icon"/>}
                  value={senhaRef.current}
                  onChange={(e) => senhaRef.current = (e.target as HTMLInputElement).value}
              />
              <CustomInput
                  type="password"
                  placeholder="Digite novamente sua senha"
                  icon={<MdLock className="custom-input-icon"/>}
                  value={senhadenovoRef.current}
                  onChange={(e) => senhadenovoRef.current = (e.target as HTMLInputElement).value}
              />
              {/* @ts-ignore */}
              <CustomButton text="Salvar" color="#800000" onClick={handleSubmit} />
            </div>
          </div>
          <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={3000}
            />
        </IonContent>
      </IonPage>
);
};

export default NovaSenha;
