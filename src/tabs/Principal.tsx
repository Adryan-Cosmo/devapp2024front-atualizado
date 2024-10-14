import {  StyleSheet, TouchableOpacity } from 'react-native';
import {   Image, VStack, Container, Center, Card, Stack, Text, Button, Icon, Box, Modal, Badge, Divider, HStack, Spacer, Flex} from 'native-base';
import Logo from '../assets/dolly-fish.png';
import { TEMAS } from '../estilos/temas';
import React, { useEffect, useState } from 'react';
import { Header } from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 
import { Titulo } from '../componentes/Titulo';
import { Texto } from '../componentes/Texto';
import { gerenciarDatas } from '../utils/GerenciarDatas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarUsuario } from '../servicos/usuario';

export default function Principal({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSincronizacao, setShowModalSincronizacao] = useState(false);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

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
    <VStack flex={1} space={4} alignItems="center" p={5} justifyContent="center">
      <Image source={Logo} alt="Logo do aplicativo Aquigest" mb={-10} />
        <Titulo mb={-4}>
            AQUIGEST
        </Titulo>  

        <Box rounded="lg" overflow="hidden"  borderColor="coolGray.300" maxW="100%" w="100%" shadow="3" bg="coolGray.100" p="5" mt="5">
          <HStack alignItems="center">
            <Badge colorScheme="darkBlue" _text={{
            color: "white"
            }} variant="solid" rounded="4">
              Informação
            </Badge>
            <Spacer />
            <Text fontSize={10} color="coolGray.800">
              {gerenciarDatas.formatarData(today, "dd/mm/yyyy")}
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Bem-vindo, ao AQUIGEST!
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            O AQUIGEST é um aplicativo que lhe permite registrar e controlar unidades de produção de peixes, registrar manejos e a biometria.
          </Text>
          <Flex>
            <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
              Versão 0.0
            </Text>
          </Flex>
        </Box>
 
        {usuario.role && usuario.role == "admin" ? <Button w="95%"  size={'lg'}  leftIcon={<Icon as={MaterialCommunityIcons} name="account-group" size="lg"/>}
              onPress={() => navigation.navigate('GerenciarUsuarios')}>
                Gerenciar Usuários
              </Button> : <Text></Text>}


      <Stack direction={{
            base: "row",
            md: "row"
            }} space={4} alignItems="center" >
              <Button w="45%"  size={'lg'}  leftIcon={<Icon as={MaterialCommunityIcons} name="clipboard-plus" size="lg"/>}
              onPress={() => navigation.navigate('CadastrosPrincipal')}>
                Cadastro
              </Button>
              <Button  w="45%" size={'lg'} leftIcon={<Icon as={MaterialCommunityIcons} name="clipboard-pulse-outline" size="lg"/>}
              onPress={() => navigation.navigate('BiometriaPrincipal')}>
                Biometria
              </Button>
      </Stack>
      <Stack direction={{
          base: "row",
          md: "row"
          }} space={4} alignItems="center">
            <Button  w="45%"  size={'lg'}  leftIcon={<Icon as={MaterialCommunityIcons} name="clipboard-text-clock" size="lg" />}
             onPress={() => navigation.navigate('ManejoPrincipal')}>
              Manejo
            </Button>
            <Button  w="45%" size={'lg'}   leftIcon={<Icon as={MaterialCommunityIcons}  name="clipboard-text-search-outline" size="lg"/>}
             onPress={() => navigation.navigate('RelatoriosPrincipal')}>
              Relatórios
            </Button>
      </Stack>
      <Stack direction={{
          base: "row",
          md: "row"
          }} space={4} alignItems="center">
          <Box alignItems="center">
              <Badge // bg="red.400" 
                colorScheme="danger" rounded="full" mb={-4} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                2
              </Badge>
              <Button  w="95%" size={'lg'} leftIcon={<Icon as={MaterialCommunityIcons} name="database-import" size="lg"/>}
              onPress={() => setShowModalSincronizacao(true)}>
                Sincronizar Dados
              </Button>
          </Box>
      </Stack>
      <Box mt={1} w="100%"  alignItems="center" p={5} justifyContent="center">
        <Icon as={MaterialCommunityIcons} name="head-question-outline" size="lg" />
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text color="blue.500">Ajuda</Text>
          </TouchableOpacity>
      </Box>
        
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
          _dark: {
          bg: "coolGray.800"
          },
          bg: "warmGray.50"
          }}>
          <Modal.Content maxWidth="350" maxH="400">
            <Modal.CloseButton />
            <Modal.Header>Ajuda - Tela Principal</Modal.Header>
            <Modal.Body>
              <Text>Nesta tela você poderá selecionar uma das cinco opções, sendo elas: <Text bold>Cadastro</Text>, para inserir uma unidade produtiva e visualizar os dados de alojamento; <Text bold>Biometria</Text>, onde registrará a biometria e poderá visualizar orientações de manejo; <Text bold>Manejo</Text>, onde poderá visualizar a unidade produtiva, dados de manejo e orientações de manejo; <Text bold>Relatórios</Text>, onde poderá emitir relatórios e a opção de <Text bold>Sincronizar Dados</Text>, para realizar o envio de dados, quando não tiver transmissão de dados disponíveis.  </Text>
              <Text>Para auxiliar a identificação de dados a sincronizar, se um ícone vermelho com um número ser apresentado no canto superior direito do botão, isso indica que há dados a sincronizar e quantas interações precisam ser enviadas.  </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                  Fechar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>


      <Center>
        <Modal isOpen={showModalSincronizacao} onClose={() => setShowModalSincronizacao(false)} _backdrop={{
          _dark: {
          bg: "coolGray.800"
          },
          bg: "warmGray.50"
          }}>
          <Modal.Content maxWidth="350" maxH="400">
            <Modal.CloseButton />
            <Modal.Header>Sincronização de Dados</Modal.Header>
            <Modal.Body>
              <Text>Envie os dados salvos temporariamente no dispositivo para o banco de dados. </Text>
              <Text>É necessário estar conectado aos Dados Móveis ou Rede Wi-fi. </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                  <Button bgColor='error.600' onPress={() => {
                  setShowModalSincronizacao(false);
                  }}>
                  Sincronizar
                </Button>
                
                <Button onPress={() => {
                  setShowModalSincronizacao(false);
                  }}>
                  Cancelar
                  </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>      
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
