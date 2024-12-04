export interface Usuario {
    id?: number;
    cpf: string;
    nome: string;
    email: string;
    senha: string;
    isActive: number;
    role: string;
    dataCadastro: string;
}
