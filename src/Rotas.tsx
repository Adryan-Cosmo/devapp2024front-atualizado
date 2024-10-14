import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import Login from './Login';
import Tabs from './tabs';
import CadastroUsuario from './CadastroUsuario';
import CadastrosPrincipal from './telas/cadastros/CadastrosPrincipal';
import CadastroUnidadeProdutiva from './telas/cadastros/CadastroUnidadeProdutiva';
import CadastroAlojamento from './telas/cadastros/CadastroAlojamento';
import BiometriaPrincipal from './telas/biometria/BiometriaPrincipal';
import InformacoesUnidadesProdutivas from './telas/informacoes/InformacoesUnidadesProdutivas';
import CadastroBiometria from './telas/cadastros/CadastroBiometria';
import InformacoesManejo from './telas/informacoes/InformacoesManejo';
import ManejoPrincipal from './telas/manejo/ManejoPrincipal';
import CadastroManejo from './telas/cadastros/CadastroManejo';
import RelatoriosPrincipal from './telas/relatorios/RelatoriosPrincipal';
import InformacoesNotificacoes from './telas/informacoes/InformacoesNotificacoes';
import RelatorioBiometria from './telas/relatorios/RelatorioBiometria';
import RelatorioManejo from './telas/relatorios/RelatorioManejo';
import RelatorioUnidadeProdutiva from './telas/relatorios/RelatorioUnidadeProdutiva';
//import GerenciarUsuarios from "./telas/gerenciamento/GerenciarUsuarios";
import Teste from './telas/informacoes/Teste';

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Tab.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }} />
                <Tab.Screen name="CadastrosPrincipal" component={CadastrosPrincipal} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroUnidadeProdutiva" component={CadastroUnidadeProdutiva} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroAlojamento" component={CadastroAlojamento} options={{ headerShown: false }} />
                <Tab.Screen name="BiometriaPrincipal" component={BiometriaPrincipal} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroBiometria" component={CadastroBiometria} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroManejo" component={CadastroManejo} options={{ headerShown: false }} />
                <Tab.Screen name="InformacoesUnidadesProdutivas" component={InformacoesUnidadesProdutivas} options={{ headerShown: false }} />
                <Tab.Screen name="InformacoesManejo" component={InformacoesManejo} options={{ headerShown: false }} />
                <Tab.Screen name="ManejoPrincipal" component={ManejoPrincipal} options={{ headerShown: false }} />
                <Tab.Screen name="RelatoriosPrincipal" component={RelatoriosPrincipal} options={{ headerShown: false }} />
                <Tab.Screen name="InformacoesNotificacoes" component={InformacoesNotificacoes} options={{ headerShown: false }} />
                <Tab.Screen name="RelatorioBiometria" component={RelatorioBiometria} options={{ headerShown: false }} />
                <Tab.Screen name="RelatorioManejo" component={RelatorioManejo} options={{ headerShown: false }} />
                <Tab.Screen name="RelatorioUnidadeProdutiva" component={RelatorioUnidadeProdutiva} options={{ headerShown: false }} />

                <Tab.Screen name="Teste" component={Teste} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
