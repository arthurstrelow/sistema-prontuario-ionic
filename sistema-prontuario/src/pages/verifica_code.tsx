import React, { useState, useRef } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CustomButton from '../components/button/CustomButton';
import "../css/verifica-code.css";

const VerificarCodigo: React.FC = () => {
  const [codes, setCodes] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = codes.join('');
    // Lógica para verificar o código de verificação
    console.log('Código de verificação:', verificationCode);
  };

  const handleResend = () => {
    // Lógica para reenviar o código de verificação
    console.log('Reenviar código de verificação');
  };

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
              <CustomButton text="Verificar" color="#800000" />
            </form>
          </div>
          <div className="resend-link" onClick={handleResend}>
            Não recebeu o código? Reenviar
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerificarCodigo;
