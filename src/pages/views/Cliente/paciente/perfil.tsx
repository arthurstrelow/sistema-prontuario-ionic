import React from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
    IonRouterOutlet,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import { calendar, personCircle } from 'ionicons/icons';
import { Route, useHistory } from "react-router-dom";
import '../../../../css/singin.css';


const Perfil: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Perfil</IonTitle>
            </IonToolbar>
        </IonHeader>
        
        <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar} />
                    <IonLabel>Consultas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Chat" href="cliente/Chat">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Chat</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonPage>
);

export default Perfil;