import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonButton, IonLoading, IonAlert,IonTabBar,IonTabButton,IonIcon,
  IonSelect, IonSelectOption
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../../css/criarconsulta.css'; // Importando o CSS
import { calendar, personCircle, logOutOutline, arrowBackOutline, settingsOutline } from 'ionicons/icons';
import { ConsultaEspecifica, allMedicosPacientes } from '../../../../service/service';
const EditarConsulta: React.FC = ({ match }) => {
  const { id } = match.params;
  const [dadosFormulario, setDadosFormulario] = useState({
    data_consulta: '',
    diagnostico: '',
    observacoes: '',
    exames_passados: '',
    hora_consulta: '',
    id_medico: 0,
    id_paciente: 0,
    finalizado: false
  });
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const history = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const buscarMedicosEPacientes = async () => {
      try {
        
        const {medicosResponse, pacientesResponse} = await allMedicosPacientes()
        setMedicos(medicosResponse.data.data);
        setPacientes(pacientesResponse.data.data);
      } catch (erro) {
        console.error('Erro ao buscar médicos e pacientes:', erro);
      }
    };

    const buscarConsulta = async () => {
      try {
        
        const resposta = await ConsultaEspecifica(parseInt(id))
        const consulta = resposta;
        setDadosFormulario({
          id_consulta: parseInt(id),
          data_consulta: consulta.data_consulta.split('T')[0],
          diagnostico: consulta.diagnostico,
          observacoes: consulta.observacoes_consulta,
          exames_passados: consulta.exames_passados,
          hora_consulta: consulta.hora_consulta,
          id_medico: consulta.id_medico,
          id_paciente: consulta.id_paciente,
          finalizado: consulta.finalizado
        });
      } catch (erro) {
        console.error('Erro ao buscar consulta:', erro);
      }
    };

    buscarMedicosEPacientes();
    buscarConsulta();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleMedicoChange = (e) => {
    const medicoSelecionado = medicos.find(medico => medico.id_medico === parseInt(e.detail.value));
    setDadosFormulario({ ...dadosFormulario, id_medico: medicoSelecionado.id_medico });
  };

  const handlePacienteChange = (e) => {
    const pacienteSelecionado = pacientes.find(paciente => paciente.id_paciente === parseInt(e.detail.value));
    setDadosFormulario({ ...dadosFormulario, id_paciente: pacienteSelecionado.id_paciente });
  };

  const handleStatusChange = (e) => {
    const { value } = e.detail;
    setDadosFormulario({ ...dadosFormulario, finalizado: value });
  };

  const handleSubmit = async () => {
    try {
      setCarregando(true);

      // Formatação da data e hora
      const dadosFormatados = {
        ...dadosFormulario,
        data_consulta: dadosFormulario.data_consulta,
        hora_consulta: dadosFormulario.hora_consulta,
        status: dadosFormulario.finalizado // Adiciona o campo status
      };

      delete dadosFormatados.finalizado; // Remove o campo finalizado

      const headers = { headers: { authorization: `Bearer ${token}` } };
      const resposta = await axios.put('http://localhost:3000/api/editar/consulta', { ...dadosFormatados, id_consulta: parseInt(id) }, headers);
      if (resposta.data.status_code === 200) {
        history.push('/consultas');
      } else {
        setMensagemAlerta(resposta.data.data);
        setMostrarAlerta(true);
      }
    } catch (erro) {
      setMensagemAlerta('Erro ao editar consulta. Tente novamente mais tarde.');
      setMostrarAlerta(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Consulta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="nova-consulta-content">
        <IonItem>
          <IonLabel position="stacked">Data</IonLabel>
          <IonInput
            type="date"
            name="data_consulta"
            value={dadosFormulario.data_consulta}
            onIonChange={handleInputChange}
            placeholder="Selecione a data"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Hora</IonLabel>
          <IonInput
            type="time"
            name="hora_consulta"
            value={dadosFormulario.hora_consulta}
            onIonChange={handleInputChange}
            placeholder="Selecione a hora"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Diagnóstico</IonLabel>
          <IonInput name="diagnostico" value={dadosFormulario.diagnostico} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Observações</IonLabel>
          <IonInput name="observacoes" value={dadosFormulario.observacoes} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Exames Passados</IonLabel>
          <IonInput name="exames_passados" value={dadosFormulario.exames_passados} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Médico</IonLabel>
          <IonSelect
            name="id_medico"
            value={dadosFormulario.id_medico}
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
            value={dadosFormulario.id_paciente}
            onIonChange={handlePacienteChange}
          >
            {pacientes.map((paciente) => (
              <IonSelectOption key={paciente.id_paciente} value={paciente.id_paciente}>
                {paciente.nome}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Status</IonLabel>
          <IonSelect
            name="finalizado"
            value={dadosFormulario.finalizado}
            onIonChange={handleStatusChange}
          >
            <IonSelectOption value={true}>Ativa</IonSelectOption>
            <IonSelectOption value={false}>Inativa</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton onClick={handleSubmit} expand="full">Salvar</IonButton>
        <IonLoading isOpen={carregando} message={'Carregando...'} />
        <IonAlert
          isOpen={mostrarAlerta}
          onDidDismiss={() => setMostrarAlerta(false)}
          header={'Erro'}
          message={mensagemAlerta}
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

export default EditarConsulta;
