import React, { useState, useEffect, useRef } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFooter, IonInput, IonButton, IonList, IonItem, IonLabel, IonSpinner
} from '@ionic/react';
import axios from 'axios';
import './Chat.css'; // Importando o CSS

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token');

  const fetchMessages = async () => {
    try {
      const headers = { headers: { authorization: `Bearer ${token}` } };
      const response = await axios.get('https://sistema-prontuario.onrender.com/api/listar/mensagens', headers);
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    setSending(true);
    try {
      const headers = { headers: { authorization: `Bearer ${token}` } };
      const response = await axios.post('https://sistema-prontuario.onrender.com/api/enviar/mensagem', { text: newMessage }, headers);
      if (response.data.status_code === 200) {
        setMessages([...messages, response.data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
      <IonContent>
        <IonList>
          {loading ? (
            <IonItem>
              <IonLabel>
                <IonSpinner /> Carregando mensagens...
              </IonLabel>
            </IonItem>
          ) : (
            messages.map((message, index) => (
              <IonItem key={index} className={message.user === 'currentUser' ? 'message-sent' : 'message-received'}>
                <IonLabel className="message-bubble">
                  <h3>{message.user}</h3>
                  <p>{message.text}</p>
                </IonLabel>
              </IonItem>
            ))
          )}
          <div ref={messageEndRef}></div>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonInput
              value={newMessage}
              placeholder="Digite sua mensagem"
              onIonChange={e => setNewMessage(e.detail.value!)}
            />
            <IonButton onClick={sendMessage} disabled={sending}>
              {sending ? <IonSpinner /> : 'Enviar'}
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
