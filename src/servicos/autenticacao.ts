import api from "./api";

export async function fazerLogin(email: string, senha: string){
    if(!email || !senha) return null;
    try{
        const resultado = await api.post('/api/usuario', {email, senha},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }})
        return resultado.data;
    }catch(error){
        console.log(error);
        return null;
    }
}