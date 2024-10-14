import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface Unidade {
    id?: number;
    nome: string;
    area: Double;
    profundidade: Double;
    volume: Double;
    datacriacao: string;
    usuario?: any;
    isactive?: Number;   
}
