import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../css/abertura.css';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.logo')?.classList.add('disperse');
    }, 2000);

    const redirectTimer = setTimeout(() => {
      history.push('/login');
    }, 3000); // 1s for animation after 2s delay

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [history]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="logo-container">
          <div className="logo">MedClini</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;
