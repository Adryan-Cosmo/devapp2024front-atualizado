import { VStack, Image, Box, Checkbox, ScrollView, FormControl, Input, Button, useToast, Icon } from 'native-base';
import Logo from '../../assets/dolly-fish.png';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { Botao } from '../../componentes/Botao';
import { useState } from 'react';
import { unidade } from '../../utils/CadastroUnidadeProdutivaTexto';
import { TEMAS } from '../../estilos/temas';
import { cadastrarUnidade } from '../../servicos/unidades';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CadastroUnidadeProdutiva({navigation}) {

  const [unidades, setUnidades] = useState({} as any);
  const toast = useToast();

  function atualizaDados(campo: string, valor: string){
    setUnidades({...unidades, [campo]:valor });
  }

  async function cadastrar() {
    const resultado = await cadastrarUnidade({
      nome: unidades.nome,
      area: unidades.area,
      profundidade: unidades.profundidade,
      volume: unidades.volume,
      datacriacao: new Date().toISOString().slice(0, 19).replace('T', ' '),
      usuario: await AsyncStorage.getItem('idusuario'),
      isactive: 1
    });
    if(!resultado){
      toast.show({
        title: "Unidade não cadastrada!",
        description: "A unidade não foi cadastrada! Verifique os campos!",
        backgroundColor: 'red.500'
      })
    }else {
      toast.show({
        title: "Unidade Cadastrada!",
        description: `A Unidade com a ${resultado.data.id} foi cadastrado!!`,
        backgroundColor: 'green.500'
      })
    }
    setUnidades({});
  }  

  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
      <Image source={Logo} alt="Logo do aplicativo Aquigest" />
      <Titulo>
          {unidade.titulo}
      </Titulo>
      <Box>
        {
            unidade.entradaTexto.map(entrada => {
                return <EntradaTexto 
                  label={entrada.label} 
                  placeholder={entrada.placeholder} 
                  key={entrada.id}
                  value={unidades[entrada.name]} 
                  onChangeText={(text => atualizaDados(entrada.name, text))}
                  />
            })
          }
      </Box>
      <Botao w="100%" bg={TEMAS.colors.blue[800]} mb={-5} borderRadius="lg" onPress={cadastrar}>
        Salvar
      </Botao>
      <Botao w="100%" bg={TEMAS.colors.blue[800]} mb={10} borderRadius="lg" onPress={() => navigation.navigate('CadastrosPrincipal')}>
        Voltar
      </Botao>

    </VStack>
    </ScrollView>
  );
}

