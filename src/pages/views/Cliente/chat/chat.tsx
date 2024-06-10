import React, { useState, useEffect, useRef } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFooter, IonInput, IonButton, IonList, IonItem, IonLabel, IonSpinner,IonTabBar,IonTabButton,IonIcon
} from '@ionic/react';
import { calendar, personCircle, downloadOutline, logOutOutline, arrowBackOutline,settingsOutline } from "ionicons/icons";
import './Chat.css'; // Importando o CSS

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Olá, como você está?' },
    { user: 'user2', text: 'Estou bem, obrigado!' },
    { user: 'User2', text: 'Alguém viu o relatório?' },
    { user: 'User2', text: 'Sim, está no e-mail.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setSending(true);
    setTimeout(() => {
      setMessages([...messages, { user: 'Fuuas', text: newMessage }]);
      setNewMessage('');
      setSending(false);
    }, 500);
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="chat-container">
        <IonList className="chat-content">
          {messages.map((message, index) => (
            <IonItem key={index} className={`message-item ${message.user === 'Fuuas' ? 'message-sent' : 'message-received'}`}>
              <IonLabel className="message-bubble">
                <h3>{message.user}</h3>
                <p>{message.text}</p>
              </IonLabel>
            </IonItem>
          ))}
          <div ref={messageEndRef}></div>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar className="input-bar">
          <IonInput
            value={newMessage}
            placeholder="Digite sua mensagem"
            onIonChange={e => setNewMessage(e.detail.value!)}
          />
          <IonButton onClick={sendMessage} disabled={sending}>
            {sending ? <IonSpinner /> : 'Enviar'}
          </IonButton>
        </IonToolbar>
      </IonFooter>

      <IonTabBar slot="bottom">
                <IonTabButton tab="consultas" href="/inicio">
                    <IonIcon icon={calendar} />
                    <IonLabel>Consultas</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Chat" href="/Chat">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Chat</IonLabel>
                </IonTabButton>
          </IonTabBar>
    </IonPage>
    
  );
};

export default Chat;
