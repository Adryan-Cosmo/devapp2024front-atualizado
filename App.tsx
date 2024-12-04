import { NativeBaseProvider, StatusBar } from 'native-base';
import { TEMAS } from './src/estilos/temas';
import Rotas from './src/Rotas';
import React, { useEffect } from 'react';
import SyncService from './src/servicos/SyncService';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
    useEffect(() => {
        const inicializarSincronizacao = async () => {
            await SyncService.syncCadastroUsuario();
        };

        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                SyncService.syncCadastroUsuario();
            }
        });

        inicializarSincronizacao();

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <NativeBaseProvider theme={TEMAS}>
            <StatusBar backgroundColor={TEMAS.colors.blue[900]} />
            <Rotas />
        </NativeBaseProvider>
    );
}
