import React, { useEffect, useState } from 'react';
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
import '../../css/inicio.css';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import consulta from "./consulta";

// Função para carregar as consultas
const carregarConsultas = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const headers = { headers: { authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:3000/api/listar/consultas', headers);
        return response.data;
    } catch (error) {
        return [];
    }
};

const AbaConsulta = () => {
    let decodificaToken = localStorage.getItem('token') !== null ? jwtDecode(localStorage.getItem('token')) : null
    const [consultas, setConsultas] = useState([]);
    const history = useHistory();

    useEffect(() => {

        if (!decodificaToken) {
            history.push('/entrar');
            return;
        }


        const carregar = async () => {
            let conta = 0
            const data = await carregarConsultas();
            const novaData: any = []
            if (data) {
                for (let i = 0; i < data.data.length; i++){
                    if(data.data[i].id_paciente === decodificaToken.id_user){
                        novaData[i] = data.data[i]
                        conta += 1
                    }
                }
                setConsultas(novaData);
                localStorage.setItem('consu', conta)
            }
        };
        carregar();
    }, []);

    // Verificar se há consultas
    if (consultas.length === 0) {
        return (
            <IonContent className="ion-padding">
                <p>Não há consultas disponíveis.</p>
            </IonContent>
        );
    } else {
        return (
            <IonContent className="ion-padding">
                <div className="cards-container">
                    {(consultas).map((DadoConsulta, index) => (
                        <CardConsultas key={index} DadoConsulta={DadoConsulta} />
                    ))}
                </div>
            </IonContent>
        );
    }
};

// Componente de Card de Consulta
const CardConsultas = ({ DadoConsulta }) => {
    const history = useHistory();

    // Função para redirecionar para detalhes da consulta
    const CardClique = () => {
        history.push(`/consulta/${DadoConsulta.id_consulta}`);
    };
    const [hora, minutos] = DadoConsulta.hora_consulta.split(':')
    return (
        <IonCard className="appointment-card" onClick={CardClique}>
            <IonCardHeader className="ion-text-center ion-padding">
                <IonCardTitle>Médico: {DadoConsulta.nome_medico}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p>Data Consulta: {new Date(DadoConsulta.data_consulta).toLocaleDateString('pt-BR')}</p>
                <p>Horário da Consulta: {hora === '00' ? `${hora}:00` : `${hora}:${minutos}`}</p>
                <p>Especialidade do Médico: {DadoConsulta.especialidade}</p>
                <p>Consulta realizada: {DadoConsulta.finalizado ? "Sim" : "Não"}</p>
            </IonCardContent>
        </IonCard>

    );
};

const Inicio = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle style={{ textAlign: 'center' }}>Consultas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/inicio" component={AbaConsulta} exact={true} />
                    {/* Adicione outras rotas conforme necessário */}
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="inicio" href="/inicio">
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

export default Inicio;
