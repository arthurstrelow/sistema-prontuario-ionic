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
import '../../css/singin.css';


const Perfil: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Perfil</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/inicio" exact={true} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="consultas" href="/inicio">
                        <IonIcon icon={calendar} />
                        <IonLabel>Consultas</IonLabel>
                        <IonBadge>{localStorage.getItem('consu')}</IonBadge>
                    </IonTabButton>
                    <IonTabButton tab="perfil" href="/perfil">
                        <IonIcon icon={personCircle} />
                        <IonLabel>Perfil</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonContent>
    </IonPage>
);

export default Perfil;