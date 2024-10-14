import { VStack, Image, Text, Box, FormControl, Input, Button, Link, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Logo from './assets/dolly-fish.png';
import { TEMAS } from '../src/estilos/temas';
import { Titulo } from './componentes/Titulo';
import { EntradaTexto } from './componentes/EntradaTexto';
import { useState } from 'react';
import { fazerLogin } from './servicos/autenticacao';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();

  async function login(){
    const resultado = await fazerLogin(email, senha);
    if(resultado && resultado.result.id){

    try {
      await AsyncStorage.setItem('idusuario', (resultado.result.id).toString());
    } catch (error) {
      console.log(error);
    }

    navigation.replace('Tabs');
    }else{
      toast.show({
        title: "Erro no Login!",
        description: "E-mail ou senha inválidos! Verifique!",
        backgroundColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center">
      <Image source={Logo} alt="Logo do aplicativo Aquigest" />
      <Titulo> Faça login com suas credenciais </Titulo>
      
      <Box>
        <EntradaTexto label="E-mail" placeholder="Insira seu e-mail." value={email} onChangeText={setEmail} />
        <EntradaTexto label="Senha" placeholder="Insira sua senha." value={senha} onChangeText={setSenha} secureTextEntry={true} />
      </Box>
      <Button w="100%" bg={TEMAS.colors.blue[800]} mt={10} borderRadius='lg'
      onPress={login}
      >Entrar</Button>
      <Link href='https//www.google.com.br' mt={5}>
        Esqueceu sua senha?
      </Link>
      <Box mt={10} w="100%" flexDirection="row" justifyContent="center">
        <Text>Ainda não possui cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
          <Text color="blue.500">Faça seu cadastro!</Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}

