import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = 'http://localhost:3000/api';

const token = localStorage.getItem('token');
const headers = { headers: { Authorization: `Bearer ${token}` } };

const decodificaToken = token ? jwtDecode(token) : null;
const meu_usuario = decodificaToken.id_user;

//funçoes para usuarios

// Retorna todas as informações sobre um paciente
const getProfile = async () => {
  try {
    const response = await axios.post(`${baseURL}/listar/paciente`, { id_paciente: meu_usuario }, headers);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao obter o perfil do paciente:', error);
  }
};

// Retorna todas as consultas de um paciente logado
const getConsultaPaciente = async () => {
  try {
    const response = await axios.get(`${baseURL}/listar/consultas`, headers);
    const responseData = response.data.data;
    if (!Array.isArray(responseData)) {
      console.error('Erro ao obter as consultas do paciente: resposta inválida');
      return [];
    }
    console.log(responseData);
    const consultasFiltradas = responseData.filter((consulta) => consulta.id_paciente === meu_usuario);
    return consultasFiltradas;
  } catch (error) {
    console.error('Erro ao obter as consultas do paciente:', error);
    return [];
  }
};
// traz todos os campos de uma consulta
const ConsultaEspecifica = async (id) =>{
  const response = await axios.post(`${baseURL}/listar/consulta`, {
    "id_consulta": parseInt(id)
}, headers);
return response.data.data
}

// funçoes para funcionarios
// retorna todos os medicos e funcionarios juntos
const allMedicosPacientes = async () => {
  const [medicosResponse, pacientesResponse] = await Promise.all([
    axios.get(`${baseURL}/listar/medicos`, headers),
    axios.get(`${baseURL}/listar/pacientes`, headers)
  ]);

  return { medicosResponse, pacientesResponse };
};
// cria uma consulta
const criar_consulta = async(data) => {
  const response = await axios.post('http://localhost:3000/api/cadastrar/consulta', data, headers);
  return response
}

const allConsultas = async() =>{

  const response = await axios.get('http://localhost:3000/api/listar/consultas', headers);
  return response.data.data

}
const delCosulta = async (consulta) =>{
  const response = await axios.delete('http://localhost:3000/api/excluir/consulta', { data: { id_consulta: consulta }, headers});
  return response

}
export { getProfile, getConsultaPaciente, ConsultaEspecifica, allMedicosPacientes, criar_consulta, allConsultas, delCosulta};
