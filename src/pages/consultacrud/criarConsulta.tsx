import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonButton, IonLoading, IonAlert
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NovaConsulta: React.FC = () => {
  const [formData, setFormData] = useState({
    data_consulta: '',
    diagnostico: '',
    observacoes: '',
    exames_passados: '',
    hora_consulta: '',
    id_medico: 0,
    id_paciente: 0
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'id_medico' || name === 'id_paciente' ? parseInt(value) : value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Formatação da data e hora
      const formattedData = {
        ...formData,
        data_consulta: formData.data_consulta.split('T')[0],
        hora_consulta: formData.hora_consulta + ':00' 
      };

      const headers = { headers: { authorization: `Bearer ${token}` } };
      console.log(formattedData);
      const response = await axios.post('http://localhost:3000/api/cadastrar/consulta', formattedData, headers);
      console.log(response);
      if (response.data.status_code === 200) {
        history.push('/consultas');
      } else {
        setAlertMessage(response.data.data);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('fuleiro dms');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nova Consulta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Data</IonLabel>
          <IonInput name="data_consulta" type="date" value={formData.data_consulta} onIonChange={handleInputChange} required />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Hora</IonLabel>
          <IonInput name="hora_consulta" type="time" value={formData.hora_consulta} onIonChange={handleInputChange} required />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Diagnóstico</IonLabel>
          <IonInput name="diagnostico" value={formData.diagnostico} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Observações</IonLabel>
          <IonInput name="observacoes" value={formData.observacoes} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Exames Passados</IonLabel>
          <IonInput name="exames_passados" value={formData.exames_passados} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Médico ID</IonLabel>
          <IonInput name="id_medico" type="number" value={formData.id_medico} onIonChange={handleInputChange} required />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Paciente ID</IonLabel>
          <IonInput name="id_paciente" type="number" value={formData.id_paciente} onIonChange={handleInputChange} required />
        </IonItem>

        <IonButton onClick={handleSubmit} expand="full">Salvar</IonButton>

        <IonLoading isOpen={loading} message={'Carregando...'} />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default NovaConsulta;
