import { Usuario } from "../interfaces/Usuario";
import api from "./api";

export async function cadastrarUsuario(usuario : Usuario){
    if(!usuario) return null;
    try{
        const resultado = await api.post('/api/novousuario', usuario, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        return resultado;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export async function buscarUsuario(id: string){
    if(!id) return null;
    try{
        const resultado = await api.get(`/api/usuario/${id}`);
        return resultado.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export async function buscarUsuarios() {
    try{
        const results = await api.get(`/api/usuarios`);
        return results.data
    }catch(error){
        console.log(error)
        return error
    }
    
}  