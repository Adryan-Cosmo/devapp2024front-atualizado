import { VStack, Image, Box, Checkbox, Text, ScrollView, Select, CheckIcon, FormControl, Divider, Pressable, HStack, Badge, Spacer, Flex } from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { Titulo } from '../../componentes/Titulo';
import { useState } from 'react';
import { TEMAS } from '../../estilos/temas';

export default function InformacoesManejo() {
  const [unidadeselect, setUnidadeselect] = useState("");

  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
        <Image source={Logo} alt="Logo do aplicativo Aquigest" />
        <Titulo>
            Orientações de Manejo
        </Titulo>
        <Divider/>    
        <FormControl>
            <FormControl.Label>Selecione uma Unidade</FormControl.Label>
        </FormControl>
        <Box >
            <Select selectedValue={unidadeselect} minWidth="100%" accessibilityLabel="Selecione uma Unidade" placeholder="Unidade Produtiva"
                size="lg" 
                borderRadius='lg' 
                bgColor='gray.100' 
                shadow={3}
                _selectedItem={{ bg: TEMAS.colors.blue[500], endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setUnidadeselect(itemValue)} >
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
            </Select>
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

