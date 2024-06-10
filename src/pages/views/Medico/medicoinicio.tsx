import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLoading,
    IonAlert,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
} from '@ionic/react';
import { arrowBackOutline, logOutOutline, pencil, trash } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const carregarConsultasMedico = async (medicoId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const headers = { headers: { authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://localhost:3000/api/medico/${medicoId}/consultas`, headers);

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const MedicoPage = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const token = localStorage.getItem('token');
    const decodificaToken = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (!decodificaToken || decodificaToken.role !== 'medico') {
            history.push('/entrar');
            return;
        }

        const carregar = async () => {
            try {
                const consultasData = await carregarConsultasMedico(decodificaToken.id);
                setConsultas(consultasData);
            } catch (error) {
                setAlertMessage('Ocorreu um erro ao carregar as consultas. Por favor, tente novamente mais tarde.');
                setShowAlert(true);
            } finally {
                setLoading(false);
            }
        };
        carregar();
    }, [decodificaToken, history]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/entrar');
    };

    const handleDelete = (id) => {
        // Adicionar lógica de exclusão aqui
        console.log(`Excluir consulta com ID: ${id}`);
    };

    const handleStart = (id) => {
        // Adicionar lógica para iniciar a consulta
        console.log(`Iniciar consulta com ID: ${id}`);
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
                    <IonTitle>Minhas Consultas</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {loading ? (
                        <IonLoading isOpen={loading} message={"Carregando..."} />
                    ) : (
                        <IonRow>
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Consultas</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            {consultas.map((consulta) => (
                                                <IonItemSliding key={consulta.id_consulta}>
                                                    <IonItem>
                                                        <IonLabel>
                                                            <h2>Consulta ID: {consulta.id_consulta}</h2>
                                                            <p>Paciente: {consulta.nome_paciente}</p>
                                                            <p>Data: {consulta.data}</p>
                                                        </IonLabel>
                                                        <IonButtons slot="end">
                                                            <IonButton onClick={() => handleStart(consulta.id_consulta)} color="success">
                                                                Iniciar Consulta
                                                            </IonButton>
                                                            <IonButton onClick={() => handleDelete(consulta.id_consulta)} color="danger">
                                                                Apagar Consulta
                                                            </IonButton>
                                                        </IonButtons>
                                                    </IonItem>
                                                    <IonItemOptions side="end">
                                                        <IonItemOption color="primary" onClick={() => handleStart(consulta.id_consulta)}>
                                                            <IonIcon slot="icon-only" icon={pencil} />
                                                        </IonItemOption>
                                                        <IonItemOption color="danger" onClick={() => handleDelete(consulta.id_consulta)}>
                                                            <IonIcon slot="icon-only" icon={trash} />
                                                        </IonItemOption>
                                                    </IonItemOptions>
                                                </IonItemSliding>
                                            ))}
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    )}
                </IonGrid>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alerta'}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default MedicoPage;
