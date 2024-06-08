import React, { useEffect, useState } from 'react';
import {
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
    IonToolbar,
    IonLoading,
    IonAlert,
    IonButtons,
    IonButton,
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { calendar, personCircle, downloadOutline, logOutOutline, arrowBackOutline } from "ionicons/icons";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import "../../css/consulta.css";

interface ConsultaProps extends RouteComponentProps<{ id: string }> {}

const Consulta: React.FC<ConsultaProps> = ({ match }) => {
    const [consulta, setConsulta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const { id } = match.params;
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodificaToken = token ? jwtDecode(token) : null;

        const carregarConsulta = async () => {
            try {
                if (!decodificaToken) {
                    history.push('/entrar');
                    return;
                }

                const headers = { headers: { authorization: `Bearer ${token}` } };
                const response = await axios.post('http://localhost:3000/api/listar/consulta', {
                    "id_consulta": parseInt(id)
                }, headers);

                setConsulta(response.data.data);
            } catch (error) {
                setShowAlert(true);
            } finally {
                setLoading(false);
            }
        };

        carregarConsulta();
    }, []);

    const download = () => {
        console.log('Baixou o resultado do exame!');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/entrar');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Detalhes da Consulta</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="consulta-page">
                {loading ? (
                    <IonLoading isOpen={loading} message={"Carregando..."} />
                ) : consulta ? (
                    <IonCard className="consulta-card">
                        <IonCardHeader>
                            <IonCardTitle>Detalhes da Consulta</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="card-content">
                            <div className="info-section">
                                <IonCardSubtitle><strong>Nome do médico:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.nome_medico}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Especialidade do Médico:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.especialidade}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Data da Consulta:</strong></IonCardSubtitle>
                                <IonLabel>{new Date(consulta.data_consulta).toLocaleDateString('pt-BR')}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Horário da Consulta:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.hora_consulta}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Diagnóstico:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.diagnostico}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Consulta realizada:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.finalizado ? "Sim" : "Não"}</IonLabel>
                            </div>
                            <div className="info-section">
                                <IonCardSubtitle><strong>Observações:</strong></IonCardSubtitle>
                                <IonLabel>{consulta.observacoes_consulta}</IonLabel>
                            </div>
                            <div className="download-section" onClick={download}>
                                <IonIcon icon={downloadOutline} />
                                <IonLabel>Baixar Resultado do Exame</IonLabel>
                            </div>
                            
                        </IonCardContent>
                    </IonCard>
                ) : (
                    <IonCardContent>
                        <IonLabel>Ocorreu um erro ao carregar os dados da consulta.</IonLabel>
                    </IonCardContent>
                )}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alerta'}
                    message={'Ocorreu um erro ao carregar os detalhes da consulta. Por favor, tente novamente mais tarde.'}
                    buttons={['OK']}
                />
            </IonContent>
            <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar} />
                    <IonLabel>Consultas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonPage>
    );
};

export default Consulta;
