import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonLoading,
    IonAlert,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
} from '@ionic/react';
import { calendar, personCircle, logOutOutline, arrowBackOutline, settingsOutline, pencil, trash } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const carregarDados = async (url) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const headers = { headers: { authorization: `Bearer ${token}` } };
        const response = await axios.get(url, headers);

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const AdminPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const decodificaToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;

    useEffect(() => {
        // if (!decodificaToken || decodificaToken.role !== 'admin') {
        //     history.push('/entrar');
        //     return;
        // }

        const carregar = async () => {
            try {
                const medicosData = await carregarDados('http://localhost:3000/api/listar/medicos');
                const pacientesData = await carregarDados('http://localhost:3000/api/listar/pacientes');
                const consultasData = await carregarDados('http://localhost:3000/api/listar/consultas');

                setMedicos(medicosData);
                setPacientes(pacientesData);
                setConsultas(consultasData);
            } catch (error) {
                setAlertMessage('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.');
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

    const handleDelete = (type, id) => {
        // Adicionar lógica de exclusão aqui
        console.log(`Excluir ${type} com ID: ${id}`);
    };

    const handleEdit = (type, id) => {
        // Adicionar lógica de edição aqui
        console.log(`Editar ${type} com ID: ${id}`);
    };

    const handleCRUDRedirect = () => {
        history.push('/consultainit');
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
                    <IonTitle>Administração</IonTitle>
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
                        <>
                            <IonRow>
                                <IonCol size="12">
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>Médicos</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonList>
                                                {medicos.map((medico) => (
                                                    <IonItemSliding key={medico.id_medico}>
                                                        <IonItem>
                                                            <IonLabel>
                                                                <h2>{medico.nome}</h2>
                                                                <p>Especialidade: {medico.especialidade}</p>
                                                            </IonLabel>
                                                        </IonItem>
                                                        <IonItemOptions side="end">
                                                            <IonItemOption color="primary" onClick={() => handleEdit('medico', medico.id_medico)}>
                                                                <IonIcon slot="icon-only" icon={pencil} />
                                                            </IonItemOption>
                                                            <IonItemOption color="danger" onClick={() => handleDelete('medico', medico.id_medico)}>
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
                            <IonRow>
                                <IonCol size="12">
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>Pacientes</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonList>
                                                {pacientes.map((paciente) => (
                                                    <IonItemSliding key={paciente.id_paciente}>
                                                        <IonItem>
                                                            <IonLabel>
                                                                <h2>{paciente.nome}</h2>
                                                                <p>Idade: {paciente.idade}</p>
                                                            </IonLabel>
                                                        </IonItem>
                                                        <IonItemOptions side="end">
                                                            <IonItemOption color="primary" onClick={() => handleEdit('paciente', paciente.id_paciente)}>
                                                                <IonIcon slot="icon-only" icon={pencil} />
                                                            </IonItemOption>
                                                            <IonItemOption color="danger" onClick={() => handleDelete('paciente', paciente.id_paciente)}>
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
                            <IonRow>
                                <IonCol size="12">
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>
                                                Consultas
                                                <IonButton fill="solid" color="primary" slot="end" onClick={handleCRUDRedirect}>
                                                    Gerenciar Consultas
                                                </IonButton>
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonList>
                                                {consultas.map((consulta) => (
                                                    <IonItemSliding key={consulta.id_consulta}>
                                                        <IonItem>
                                                            <IonLabel>
                                                                <h2>Consulta ID: {consulta.id_consulta}</h2>
                                                                <p>Médico ID: {consulta.id_medico}</p>
                                                                <p>Paciente ID: {consulta.id_paciente}</p>
                                                            </IonLabel>
                                                        </IonItem>
                                                        <IonItemOptions side="end">
                                                            <IonItemOption color="primary" onClick={() => handleEdit('consulta', consulta.id_consulta)}>
                                                                <IonIcon slot="icon-only" icon={pencil} />
                                                            </IonItemOption>
                                                            <IonItemOption color="danger" onClick={() => handleDelete('consulta', consulta.id_consulta)}>
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
                        </>
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
            <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar} />
                    <IonLabel>Consultas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="admin" href="/admin">
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>Administração</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonPage>
    );
};

export default AdminPage;
