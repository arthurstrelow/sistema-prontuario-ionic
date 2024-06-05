import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    IonCard,
    IonCardContent,
    IonText,
    IonButton
} from '@ionic/react';
import './cardconsulta.css';

interface DadoConsultaProps {
    id_consulta: string;
    nome_medico: string;
    data_consulta: string;
    hora_consulta: string;
    especialidade: string;
    finalizado: boolean;
    hospital: string;
}

interface CardConsultasProps {
    DadoConsulta: DadoConsultaProps;
}

const CardConsultas: React.FC<CardConsultasProps> = ({ DadoConsulta }) => {
    const history = useHistory();

    const goToDetails = () => {
        history.push(`/consulta/${DadoConsulta.id_consulta}`);
    };

    return (
        <IonCard className="appointment-card">
            <IonCardContent className="card-content">
                <div className="card-header">
                    <IonText className="card-label"><strong>Data:</strong> {new Date(DadoConsulta.data_consulta).toLocaleDateString('pt-BR')}</IonText>
                </div>
                <div className="card-details">
                    <div className="card-column">
                        <IonText className="card-detail"><strong>Horário:</strong> {DadoConsulta.hora_consulta}</IonText>
                        <IonText className="card-detail"><strong>Médico(a):</strong> {DadoConsulta.nome_medico}</IonText>
                    </div>
                    <div className="card-column">
                        <IonText className="card-detail"><strong>Especialidade:</strong> {DadoConsulta.especialidade}</IonText>
                        <IonText className="card-detail"><strong>Hospital:</strong> {DadoConsulta.hospital}</IonText>
                    </div>
                </div>
                <IonButton className="details-button" onClick={goToDetails}>Detalhes</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default CardConsultas;
