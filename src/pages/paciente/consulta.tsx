import React, { useEffect, useState } from 'react';
import {
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { calendar, personCircle } from "ionicons/icons";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface ConsultaProps extends RouteComponentProps<{ id: string }> {}

const Consulta: React.FC<ConsultaProps> = ({ match }) => {
    const [consulta, setConsulta] = useState<any>(null);
    const { id } = match.params;
    const decodificaToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
    const history = useHistory();

    useEffect(() => {
        const carregarConsulta = async () => {
            try {
                if (!decodificaToken) {
                    history.push('/');
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) return;

                const headers = { headers: { authorization: `Bearer ${token}` } };
                const response = await axios.post('http://localhost:3000/api/listar/consulta', {
                    "id_consulta": parseInt(id)
                }, headers);

                setConsulta(response.data.data);
            } catch (error) {
                history.push('/');
            }
        };

        carregarConsulta();
    }, [id, decodificaToken, history]);

    const download = () => {
        console.log('Baixou o resultado do exame!');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Detalhes da Consulta - ID: {id}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {consulta ? (
                    <IonCard>
                        <IonCardHeader className="ion-text-center ion-padding">
                            <IonCardTitle>Nome do médico: {consulta.nome_medico}</IonCardTitle>
                            <IonCardSubtitle>Especialidade do Médico: {consulta.especialidade}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>Data Consulta: {new Date(consulta.data_consulta).toLocaleDateString('pt-BR')}</p>
                            <p>Horário da Consulta: {consulta.hora_consulta}</p>
                            <p>Diagnóstico: {consulta.diagnostico}</p>
                            <p>Consulta realizada: {consulta.finalizado ? "Sim" : "Não"}</p>
                            <p onClick={download} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Clique aqui para baixar o resultado do exame!</p>
                        </IonCardContent>
                    </IonCard>
                ) : (
                    <IonLabel>Carregando...</IonLabel>
                )}
            </IonContent>
            <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar}/>
                    <IonLabel>Consultas</IonLabel>
                    <IonBadge>{localStorage.getItem('consu')}</IonBadge>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonPage>
    );
}

export default Consulta;
