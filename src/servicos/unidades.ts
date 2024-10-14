import { Unidade } from "../interfaces/Unidade";
import api from "./api";

export async function cadastrarUnidade(unidade : Unidade){
    if(!unidade) return null;
    try{
        const resultado = await api.post('/api/unidade', unidade, {
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

export async function buscarUnidade(unidade : Unidade){
    if(!unidade) return null;
    try{
        const resultado = await api.get('/api/unidades')
        return resultado;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export async function buscarUnidades(){
    try{
        const resultado = await api.get('/api/unidades')
        return resultado.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}