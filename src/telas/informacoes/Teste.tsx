import { VStack, Image, Box, Checkbox, Text, ScrollView, Select, CheckIcon, FormControl, Divider, Pressable, HStack, Badge, Spacer, Flex } from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { Titulo } from '../../componentes/Titulo';
import { useEffect, useState } from 'react';
import { TEMAS } from '../../estilos/temas';
import { buscarUnidades } from '../../servicos/unidades';

export default function Teste({route, navigation}) {
 
    useEffect(()=>{
       console.log(route)
    
      },[])

  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
        <Image source={Logo} alt="Logo do aplicativo Aquigest" />
        <Titulo>
            Infomações
        </Titulo>

        <Box >
                <Text>Nome: {route.params.unidade.nome} Volume: {route.params.unidade.volume}</Text>
        </Box>
    </VStack>
    </ScrollView>
  );
}

