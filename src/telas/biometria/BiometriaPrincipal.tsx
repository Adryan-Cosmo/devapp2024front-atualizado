import {  StyleSheet, TouchableOpacity } from 'react-native';
import {   Image, VStack, Container, Center, Card, Stack, Text, Button, Icon, Box, Modal, Badge} from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { TEMAS } from '../../estilos/temas';
import React, { useState } from 'react';
import { Header } from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 
import { Titulo } from '../../componentes/Titulo';
import { Texto } from '../../componentes/Texto';

export default function BiometriaPrincipal({navigation}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <VStack flex={1} space={4} alignItems="center" p={5} justifyContent="center">
        <Image source={Logo} alt="Logo do aplicativo Aquigest" />
        <Texto>Opções de Biometria</Texto>
        <Button w="95%"  size={'lg'}  leftIcon={<Icon as={MaterialCommunityIcons} name="clipboard-search" size="lg"/>}
        onPress={() => navigation.navigate('InformacoesUnidadesProdutivas')}>
            Unidade Produtiva
        </Button>
        <Button  w="95%" size={'lg'} leftIcon={<Icon as={MaterialCommunityIcons} name="clipboard-pulse-outline" size="lg"/>}
        onPress={() => navigation.navigate('CadastroBiometria')}>
            Biometria
        </Button>
        <Button  w="95%" size={'lg'} leftIcon={<Icon as={MaterialCommunityIcons} name="chart-box-outline" size="lg"/>}
        onPress={() => navigation.navigate('InformacoesManejo')}>
            Orientações de Manejo
        </Button>
        <Button  w="95%" size={'lg'} leftIcon={<Icon as={MaterialCommunityIcons} name="home" size="lg"/>}
        onPress={() => navigation.navigate('Tabs')}>
            Tela Principal
        </Button>        
        <Box mt={10} w="100%"  alignItems="center" p={5} justifyContent="center">
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
                <Text>Gerencie as informações de Biometria.</Text>
                <Text>Para retornar a tela principal, toque no botão Tela Principal</Text>
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
