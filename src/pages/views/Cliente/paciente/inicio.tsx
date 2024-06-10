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
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonAvatar,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import { calendar, personCircle, logOutOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import CardConsultas from '../../../../components/Cardconsulta/cardconsulta';
import '../.../../../../../css/inicio.css';
import { getConsultaPaciente, getProfile } from '../../../../service/service';



const Inicio = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [pacienteinfos, setPaciennteinfos] = useState({}) // acesso a toodas as informaçoes do paciente isso inclue os seguintes ponto para dinamitização
//     altura
// bairro
// cep
// cidade
// complemento
// cpf
// criado_em
// datanascimento
// editado_em
// email
// estado
// genero
// historico_medico
// id_paciente
// medicamentos_em_uso
// nome
// numero
// peso
// rua
// telefone
// tipo_sanguineo
// tipo_usuario
    const history = useHistory();
    const decodificaToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;

    useEffect(() => {
        if (!decodificaToken) {
            history.push('/entrar');
            return;
        }

        const carregar = async () => {
            const data = await getConsultaPaciente();
            const infopaciente = await getProfile()
            console.log(infopaciente)
            setPaciennteinfos(infopaciente)
           
            
            if (data) {  
                setConsultas(data);                   
            } else {
                setShowAlert(true);
            }
            setLoading(false);
        };
        carregar();
    }, []);

    useEffect(() => {
        const logoutTimeout = setTimeout(() => {
            setShowAlert(true);
        }, 600000); 

        return () => clearTimeout(logoutTimeout);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/entrar');
    };


    // Vai tomar no cu Baiano safado



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>MedClini</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="inicio-header">
                    <h1>Olá, {pacienteinfos.nome}</h1>
                    <div className="info-card">
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>{pacienteinfos.nome}</IonCardSubtitle>
                                <IonCardTitle>Informações do Paciente</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Aqui você encontra informações importantes sobre o paciente.
                            </IonCardContent>
                        </IonCard>
                        <img src="caminho_para_imagem" alt="Imagem do Paciente" className="patient-image" />
                    </div>
                </div>

                {loading ? (
                    <IonLoading isOpen={loading} message={"Carregando..."} />
                ) : (
                    <>
                        {consultas.length == 0 ? (
                            <p>Não há consultas disponíveis.</p>
                        ) : (
                            <div className="cards-container-horizontal">
                                
                                {consultas.map((DadoConsulta, index) => (
                                    <CardConsultas key={index} DadoConsulta={DadoConsulta} />
                                ))}
                            </div>
                        )}
                    </>
                )}

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alerta'}
                    message={'Ocorreu um erro ao carregar as consultas. Por favor, tente novamente mais tarde.'}
                    buttons={['OK']}
                />


<IonGrid>
                    <IonRow>
                        <IonCol size="12" size-md="4">
                            <section className="health-section">
                                <header>
                                    <h3>Medicamentos em Uso</h3>
                                </header>
                                <div className="section-content">
                                    <IonList>
                                        
                                            
                                                <IonItem>
                                                    <IonAvatar slot="start">
                                                        <img src="caminho_para_imagem_medicamento" alt={`Medicamento ${1}`} />
                                                    </IonAvatar>
                                                    <IonLabel>
                                                        <h2>{pacienteinfos.medicamentos_em_uso}</h2>
                                                    </IonLabel>
                                                </IonItem>
                                         
                                    </IonList>
                                </div>
                            </section>
                        </IonCol>
                    </IonRow>
                </IonGrid>


                <IonGrid>
                    <IonRow>
                        <IonCol size="12" size-md="4">
                            <section className="health-section">
                                <header>
                                    <h3>Adicionar algo </h3>
                                    <h2>pronto para add</h2>
                                </header>
                                <div className="section-content">
                                    <IonList>
                                        <IonItem>
                                            <IonAvatar slot="start">
                                                <img src="caminho_para_imagem_exame1" alt="Exame 1" />
                                            </IonAvatar>
                                            <IonLabel>
                                                <h2>Fuuas exames</h2>
                                                <p>Data: 20/04/2024</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonAvatar slot="start">
                                                <img src="caminho_para_imagem_exame2" alt="Exame 2" />
                                            </IonAvatar>
                                            <IonLabel>
                                                <h2>XXX</h2>
                                                <p>Data: 15/03/2024</p>
                                            </IonLabel>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </section>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
            <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar} />
                    <IonLabel>Consultas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil/cliente">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Chat" href="cliente/Chat">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Chat</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonPage>
    );
};

export default Inicio;
