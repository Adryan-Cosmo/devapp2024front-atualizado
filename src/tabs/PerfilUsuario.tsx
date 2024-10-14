import {  StyleSheet } from 'react-native';
import {  Text,  Button, VStack, Image} from 'native-base';
import Logo from '../assets/dolly-fish.png';
import { TEMAS } from '../estilos/temas';
import { Titulo } from '../componentes/Titulo';
import { Texto } from '../componentes/Texto';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarUsuario } from '../servicos/usuario';

export default function PerfilUsuario({navigation}) {

  const [idusuario, setIdUsuario] = useState('');
  const [usuario, setUsuario] = useState({} as any);

  useEffect(()=>{
    obtemUsuario();

  },[])

  async function obtemUsuario(){
    try {
        const id = await AsyncStorage.getItem('idusuario');
        setIdUsuario(id);
        if (id !== null) {
            const usuarioaux = await buscarUsuario(id);
            setUsuario({...usuarioaux.result})
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center">
    <Image source={Logo} alt="Logo do aplicativo Aquigest" />
    <Titulo mb={10}>Perfil do Usuário</Titulo>
    <Texto>Nome</Texto>
    <Text>{usuario.nome}</Text>
    <Texto>CPF</Texto>
    <Text>{usuario.cpf}</Text>
    <Texto>E-mail</Texto>
    <Text>{usuario.email}</Text>
    <Texto>Tipo de Usuário</Texto>
    {usuario.role && usuario.role == "normal" ? <Text>Usuário Comum.</Text> : <Text>Administrador.</Text>}

    <Button w="100%" bg={TEMAS.colors.blue[800]} mt={10} borderRadius='lg'
        onPress={()=>navigation.navigate('CadastroUnidade')}
      >Editar Usuário</Button>

    <Button w="100%" bg={TEMAS.colors.red[500]} mt={5} borderRadius='lg'
        onPress={()=>navigation.replace('Login')}
    >Logoff</Button>

    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
