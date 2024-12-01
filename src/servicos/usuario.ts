import { Usuario } from '../interfaces/Usuario';
import api from './api';

export async function cadastrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (!usuario) return null;
    try {
        const resultado = await api.post('/api/novousuario', usuario, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        });
        return resultado;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarUsuario(id: string) {
    if (!id) return null;
    try {
        const resultado = await api.get(`/api/usuario/${id}`);
        return resultado.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarUsuarios() {
    try {
        const results = await api.get(`/api/usuarios`);
        return results.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function atualizarUsuario(id: string, usuario: Usuario) {
    if (!id || !usuario) {
        console.error('ID ou usuário inválido:', { id, usuario });
        return null;
    }

    console.log('Dados enviados para API:', { id, usuario }); // Log do payload

    try {
        const resultado = await api.put(
            `/api/atualizausuario/${id}`,

            usuario,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return resultado.data;
    } catch (error) {
        console.log('Erro ao atualizar usuário:', error);
        return null;
    }
}
