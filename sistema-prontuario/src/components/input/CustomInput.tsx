import React from 'react';
import { IonInput, IonItem } from '@ionic/react';
import './CustomInput.css';

interface CustomInputProps {
  type?: string;
  placeholder: string;
  icon: React.ReactElement;
}

const CustomInput: React.FC<CustomInputProps> = ({ type = "text", placeholder, icon }) => {
  return (
    <IonItem className="custom-input-item">
      {icon}
      <IonInput placeholder={placeholder} className="custom-input" />
    </IonItem>
  );
};

export default CustomInput;
