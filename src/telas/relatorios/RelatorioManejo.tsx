import { VStack, Image, Box, Checkbox, Text, ScrollView, Select, CheckIcon, FormControl } from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { Titulo } from '../../componentes/Titulo';
import { Botao } from '../../componentes/Botao';
import { useState } from 'react';
import { TEMAS } from '../../estilos/temas';

export default function RelatorioManejo() {
  const [unidadeselect, setUnidadeselect] = useState("");
  const [alojamentos, setAlojamentos] = useState([] as number[]);

 

  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
        <Image source={Logo} alt="Logo do aplicativo Aquigest" />
        <Titulo>
            Relatório de Manejo
        </Titulo>
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
        

        <Botao w="100%" bg={TEMAS.colors.blue[800]} mb={10} borderRadius="lg" >
            Visualizar Relatório
        </Botao>
    </VStack>
    </ScrollView>
  );
}

