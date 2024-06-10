import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonButton, IonLoading, IonAlert,IonTabBar,IonTabButton,IonIcon,
  IonSelect, IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../../../css/criarconsulta.css'; 
import { calendar, personCircle, logOutOutline, arrowBackOutline, settingsOutline } from 'ionicons/icons';
import { allMedicosPacientes, criar_consulta } from '../../../../service/service';
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
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMedicosEPacientes = async () => {
      try {
        const {medicosResponse, pacientesResponse} = await allMedicosPacientes()
        setMedicos(medicosResponse.data.data);
        setPacientes(pacientesResponse.data.data);
      } catch (error) {
        console.error('Erro ao buscar médicos e pacientes:', error);
      }
    };

    fetchMedicosEPacientes();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicoChange = (e) => {
    console.log(e)
    const selectedMedico = medicos.find(medico => medico.id_medico === parseInt(e.detail.value));
    setFormData({ ...formData, id_medico: selectedMedico.id_medico });
  };

  const handlePacienteChange = (e) => {
    const selectedPaciente = pacientes.find(paciente => paciente.id_paciente === parseInt(e.detail.value));
    setFormData({ ...formData, id_paciente: selectedPaciente.id_paciente });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Formatação da data e hora
      const formattedData = {
        ...formData,
        data_consulta: formData.data_consulta,
        hora_consulta: formData.hora_consulta + ':00'
      };

      const headers = { headers: { authorization: `Bearer ${token}` } };
      console.log(formData)
      const response = await criar_consulta(formData)
      if (response.data.status_code === 200) {
        history.push('/consultasinit');
      } else {
        setAlertMessage(response.data.data);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Erro ao registrar consulta. Tente novamente mais tarde.');
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
      <IonContent className="nova-consulta-content">
        <IonItem>
          <IonLabel position="stacked">Data</IonLabel>
          <IonInput
            type="date"
            name="data_consulta"
            value={formData.data_consulta}
            onIonChange={handleInputChange}
            placeholder="Selecione a data"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Hora</IonLabel>
          <IonInput
            type="time"
            name="hora_consulta"
            value={formData.hora_consulta}
            onIonChange={handleInputChange}
            placeholder="Selecione a hora"
          />
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
          <IonLabel position="stacked">Médico</IonLabel>
          <IonSelect
            name="id_medico"
            value={formData.id_medico}
            onIonChange={handleMedicoChange}
          >
            {medicos.map((medico) => (
              <IonSelectOption key={medico.id_medico} value={medico.id_medico}>
                {medico.nome}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Paciente</IonLabel>
          <IonSelect
            name="id_paciente"
            value={formData.id_paciente}
            onIonChange={handlePacienteChange}
          >
            {pacientes.map((paciente) => (
              <IonSelectOption key={paciente.id_paciente} value={paciente.id_paciente}>
                {paciente.nome}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton onClick={handleSubmit} expand="full">Salvar</IonButton>
        <IonLoading isOpen={loading} message={'Carregando...'} />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Erro'}
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

export default NovaConsulta;
