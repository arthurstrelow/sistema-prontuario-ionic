import React, {useState, useRef, useEffect} from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import CustomButton from '../components/button/CustomButton';
import "../css/verifica-code.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

const VerificarCodigo: React.FC = () => {
  const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const email = localStorage.getItem('email')
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem('email')) history.push('/entrar')
  }, []);


  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Focus next input
    if (value !== '' && index < codes.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && codes[index] === '') {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = codes.join('');
    await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/verificacodigo',
      data: {'email_cpf': email, 'codigo': verificationCode}
    }).then(async (result)=> {
      history.push("/nova-senha");
      localStorage.setItem('codigo', verificationCode)

      // @ts-ignore
      setToastMessage(result.data.data);
      setShowToast(true);
    }).catch(async (error) => {
      // @ts-ignore
      const msg = error.response === undefined || error.response.status === 404 ? 'Algo deu errado!' : error.response.data.data
      setToastMessage(msg)
      setShowToast(true);
    })
  };

  const handleResend = async () => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/esqueciSenha',
      data: {'email_cpf': email}
    }).then(async (result) => {
      // @ts-ignore
      setToastMessage(result.data.data);
      setShowToast(true);
    }).catch(async (error) => {
      // @ts-ignore
      const msg = error.response === undefined || error.response.status === 404 ? 'Algo deu errado!' : error.response.data.data
      setToastMessage(msg)
      setShowToast(true);
    })
  };

  // @ts-ignore
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <h2>Verificar Código</h2>
          <p>Digite o código de verificação enviado para o seu email.</p>
          <div className="code-container">
            <form onSubmit={handleSubmit}>
              {codes.map((code, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength={1}
                  value={code}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => inputs.current[index] = el}
                />
              ))}
              {/* @ts-ignore */}
              <CustomButton text="Verificar" color="#800000" onClick={handleSubmit}/>
            </form>
          </div>
          <div className="resend-link" onClick={handleResend}>
            Não recebeu o código? Reenviar
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

export default VerificarCodigo;
