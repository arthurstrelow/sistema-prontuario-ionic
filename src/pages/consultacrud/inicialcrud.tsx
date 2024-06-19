import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonButton, IonButtons, IonLoading, IonAlert
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const ConsultasLista: React.FC = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedConsultaId, setSelectedConsultaId] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;

  const carregarConsultas = async () => {
    try {
      if (!token) return [];

      const headers = { headers: { authorization: `Bearer ${token}` } };
      const response = await axios.get('https://sistema-prontuario.onrender.com/api/listar/consultas', headers);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching consultations:', error);
      return [];
    }
  };

  useEffect(() => {
    if (!decodedToken) {
      history.push('/entrar');
      return;
    }

    const carregar = async () => {
      const data = await carregarConsultas();
      if (data) {
        setConsultations(data);
      } else {
        setAlertMessage('Unable to fetch consultations. Please try again later.');
        setShowAlert(true);
      }
      setLoading(false);
    };

    carregar();
  }, []);

  useEffect(() => {
    const logoutTimeout = setTimeout(() => {
      setShowAlert(true);
    }, 600000); // 10 minutes

    return () => clearTimeout(logoutTimeout);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/entrar');
  };

  const handleDeleteClick = (id_consulta) => {
    setSelectedConsultaId(id_consulta);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const headers:object = { headers: { authorization: `Bearer ${token}` } };
      const response = await axios.delete('https://sistema-prontuario.onrender.com/api/excluir/consulta', { data: { id_consulta: selectedConsultaId }, headers });
      console.log(response)
      if (response.data.status_code === 200) {
        setConsultations(consultations.filter(consulta => consulta.id_consulta !== selectedConsultaId));
      } else {
        setAlertMessage(response.data.data);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error removing consultation. Please try again later.');
      setShowAlert(true);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consultas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/criarconsulta')}>Nova Consulta</IonButton>
            <IonButton color="danger" onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonLoading isOpen={loading} message={'Loading...'} />
        ) : (
          <IonList>
            {consultations.map((consulta, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>Data: {consulta.data_consulta}</h2>
                  <p>Hora: {consulta.hora_consulta}</p>
                  <p>Médico ID: {consulta.id_medico}</p>
                  <p>Paciente ID: {consulta.id_paciente}</p>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton color="primary" onClick={() => history.push(`/editar/${consulta.id_consulta}`)}>Editar</IonButton>
                  <IonButton color="danger" onClick={() => handleDeleteClick(consulta.id_consulta)}>Remover</IonButton>
                </IonButtons>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={alertMessage}
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header={'Confirmar'}
          message={'Tem certeza que deseja remover esta consulta?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowConfirm(false)
            },
            {
              text: 'Sim',
              handler: handleDeleteConfirm
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ConsultasLista;
