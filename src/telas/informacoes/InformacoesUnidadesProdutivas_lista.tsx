import { VStack, Image, Box, Checkbox, Text, ScrollView, Select, CheckIcon, FormControl, Divider, Pressable, HStack, Badge, Spacer, Flex } from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { Titulo } from '../../componentes/Titulo';
import { useEffect, useState } from 'react';
import { TEMAS } from '../../estilos/temas';
import { buscarUnidades } from '../../servicos/unidades';

export default function InformacoesUnidadesProdutivas({navigation}) {
  const [unidadeselect, setUnidadeselect] = useState("");
  const [unidades, setUnidades] = useState([{}] as any);

  useEffect(()=>{
    obtemUnidades();

  },[])


  async function obtemUnidades(){
            const unidadesaux = await buscarUnidades();
            setUnidades([...unidadesaux.result]);
            console.log(unidades)
        if(unidades.length == 0) {
        console.log("Não há retorno!");
        }
  }
  


  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
        <Image source={Logo} alt="Logo do aplicativo Aquigest" />
        <Titulo>
            Infomações Unidades Produtivas
        </Titulo>

        <Box >
            {unidades.map(unidade => {
              return <Text key={unidade.id} onPress={
                navigation.navigate('Teste', {unidade})
              }>{unidade.nome}</Text>
            })}
        </Box>      
        
  

        <Box rounded="lg" overflow="hidden"  borderColor="coolGray.300" maxW="100%" w="100%" shadow="3" bg="coolGray.100" p="5" mt="5">
          <HStack alignItems="center">
            <Badge colorScheme="darkBlue" _text={{
            color: "white"
          }} variant="solid" rounded="4">
              Business
            </Badge>
            <Spacer />
            <Text fontSize={10} color="coolGray.800">
              1 month ago
            </Text>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Marketing License
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            Unlock powerfull time-saving tools for creating email delivery and
            collecting marketing data
          </Text>
          <Flex>
            <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
              Read More
            </Text>
          </Flex>
        </Box>
    </VStack>
    </ScrollView>
  );
}

