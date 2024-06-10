import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, logout } from '../../../../service/service';

const Profile = ({ setAuth }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
         const response = await getProfile(); // Passe o ID do paciente conforme necessário
            setProfile(response)
      } catch (error) {
        console.error(error);
      }
    };
    console.log("paginacerta")
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    
    localStorage.removeItem('authToken');
    setAuth(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Sair</button>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            value={profile.nome || ''}
            onChange={handleChange}
          />
          <input
            name="cpf"
            value={profile.cpf || ''}
            onChange={handleChange}
          />
          <input
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
          />
          {/* Adicione outros campos conforme necessário */}
          <button type="submit">Salvar</button>
        </form>
      ) : (
        <div>
          <h1>{profile.nome}</h1>
          <p>CPF: {profile.cpf}</p>
          <p>Email: {profile.email}</p>
          {/* Exiba outros campos conforme necessário */}
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
