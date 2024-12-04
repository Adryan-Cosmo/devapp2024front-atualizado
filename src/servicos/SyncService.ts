import LocalStorageService from './LocalStorage';
import NetInfo from '@react-native-community/netinfo';
import { cadastrarUsuario } from '../servicos/usuario';
import { Usuario } from '../interfaces/Usuario';

class SyncService {
    static async syncCadastroUsuario(): Promise<void> {
        try {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected) {
                console.log('Sem conexão com a internet. Sincronização adiada.');
                return;
            }

            const dadosLocais = await LocalStorageService.getItem('cadastroUsuario');
            if (dadosLocais) {
                const resultado = await cadastrarUsuario(dadosLocais);
                if (resultado) {
                    console.log('Dados sincronizados com sucesso:', resultado);
                    await LocalStorageService.removeItem('cadastroUsuario');
                }
            }
        } catch (error) {
            console.error('Erro ao sincronizar dados locais:', error);
        }
    }
}

export default SyncService;
