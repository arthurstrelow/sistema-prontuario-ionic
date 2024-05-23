import React from 'react';
import { IonInput, IonItem } from '@ionic/react';
import './CustomInput.css';

interface CustomInputProps {
  placeholder: string;
    icon: React.ReactElement;
    value: string;
    onChange: (e: CustomEvent) => void;
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, icon, value, onChange, type = 'text'}) => {
  return (
    <IonItem className="custom-input-item">
      {icon}
      <IonInput
        /* @ts-ignore */
        type={type}
        placeholder={placeholder}
        className="custom-input"
        value={value}
        onIonChange={onChange}
      />
    </IonItem>
  );
};

export default CustomInput;
