import React from 'react';
import { IonInput, IonItem } from '@ionic/react';
import './CustomInput.css';

interface CustomInputProps {
  type?: string;
  placeholder: string;
  icon: React.ReactElement;
  value: string;
  onChange: (e: CustomEvent) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, icon, value, onChange }) => {
  return (
    <IonItem className="custom-input-item">
      {icon}
      <IonInput
       
        placeholder={placeholder}
        className="custom-input"
        value={value}
        onIonChange={onChange}
      />
    </IonItem>
  );
};

export default CustomInput;
