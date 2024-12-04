import api from './api';

export const adicionarEndereco = async (data) => {
    try {
        const response = await api.post('/api/enderecos', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar endereço:', error);
        throw error;
    }
};

export const atualizarEndereco = async (data) => {
    try {
        console.log(data);
        const response = await api.post('/api/updateendereco', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        throw error;
    }
};

export const buscarEndereco = async (usuarioId) => {
    try {
        const response = await api.get(`/api/enderecos/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        throw error; // Certifique-se de tratar o erro no componente
    }
};
