import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../interfaces/Usuario';

class LocalStorageService {
    static async saveItem(key: string, value: Usuario): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Erro ao salvar item no armazenamento local:', error);
        }
    }

    static async getItem(key: string): Promise<Usuario | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Erro ao recuperar item do armazenamento local:', error);
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Erro ao remover item do armazenamento local:', error);
        }
    }
}

export default LocalStorageService;
