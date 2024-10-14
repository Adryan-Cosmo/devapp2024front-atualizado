//import Principal from './src/Principal';
//import Login from './src/Login';
//import CadastroUnidade from './src/CadastroUnidade';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { TEMAS } from './src/estilos/temas';
import Rotas from './src/Rotas';
import { useEffect } from 'react';
import api from './src/servicos/api';

export default function App() {

  useEffect(()=>{
    async function getDados() {
      const resultados = await api.get('/api/unidades');
      console.log(resultados.data);
    }
    getDados()
  },[])

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]}/>
      <Rotas/>
    </NativeBaseProvider>
  );
}

