import React from 'react';
import { IonButton } from '@ionic/react';
import './CustomButton.css';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, color }) => {
  return (
    <IonButton 
      expand="block" 
      className="custom-button" 
      onClick={onClick}
      style={{ backgroundColor: color }}
      color={color}
    >
      {text}
    </IonButton>
  );
};

export default CustomButton;
