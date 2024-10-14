import { VStack, Image, Box, Checkbox, ScrollView } from 'native-base';
import Logo from '../assets/dolly-fish.png';
import { Titulo } from '../componentes/Titulo';
import { EntradaTexto } from '../componentes/EntradaTexto';
import { Botao } from '../componentes/Botao';
import { useState } from 'react';
import { secoes } from '../utils/CadastroUnidadeTexto';

export default function CadastroUnidade() {

  const [numSecao, setNumSecao] = useState(0);

  const [unidades, setUnidades] = useState([] as number[]);

      
  function avancarSecao() {
    if(numSecao < secoes.length - 1){
      setNumSecao(numSecao + 1);
    }
  }  

  function voltarSecao() {
    if(numSecao > 0){
      setNumSecao(numSecao - 1);
    }
    console.log(unidades);
  }   

  return (
    <ScrollView flex={1} p={5}>
    <VStack flex={1} alignItems="center" p={5} >
      <Image source={Logo} alt="Logo do aplicativo Aquigest" />
      <Titulo>
          {secoes[numSecao].titulo}
      </Titulo>
      <Box>
        {
            secoes[numSecao].entradaTexto.map(entrada => {
                return <EntradaTexto label={entrada.label} placeholder={entrada.placeholder} key={entrada.id}/>
            })
          }
      </Box>
      <Box>
        {
            secoes[numSecao].checkbox.map(checkbox => {
                return <Checkbox 
                          key={checkbox.id} 
                          value={checkbox.value}
                          onChange={()=>{
                            setUnidades((unidadesAnteriores) => {
                              if(unidadesAnteriores.includes(checkbox.id)){
                                return unidadesAnteriores.filter((id) => id !== checkbox.id)
                              }
                              return [...unidadesAnteriores, checkbox.id]
                            });
                          }}
                          isChecked={unidades.includes(checkbox.id)}
                          >
                          {checkbox.value}
                       </Checkbox>
            })
        }
      </Box>
      {numSecao < secoes.length - 1 && <Botao onPress={()=> avancarSecao()} mb={10}>Avançar</Botao>}
      {numSecao > 0 && <Botao onPress={()=> voltarSecao()} bgColor='gray.400'>Voltar</Botao>}
    </VStack>
    </ScrollView>
  );
}

