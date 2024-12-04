import React, { useEffect, useState } from 'react';
import { VStack, Box, Button, FormControl, ScrollView, Text, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EntradaTexto } from './componentes/EntradaTexto';
import MaskInput from 'react-native-mask-input';
import { buscarUsuario, atualizarUsuario } from './servicos/usuario';
import { atualizarEndereco, buscarEndereco } from './servicos/endereco';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeCpfMask = (cpf) => cpf.replace(/\D/g, '');

const schema = yup.object().shape({
    nome: yup
        .string()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome inválido')
        .test('nome-completo', 'Informe o nome completo', (value) => value && value.trim().split(' ').length >= 2)
        .required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    endereco: yup.string().required('Endereço é obrigatório'),
    cidade: yup.string().required('Cidade é obrigatória'),
    estado: yup.string().required('Estado é obrigatório'),
    cep: yup.string().required('CEP é obrigatório'),
});

export default function AtualizaUsuario() {
    const navigation = useNavigation();
    const toast = useToast();
    const [loading, setLoading] = useState(true);

    const [idusuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState({} as any);
    const [endereco, setEndereco] = useState({} as any);

    useEffect(() => {
        obtemDados();
    }, []);

    async function obtemDados() {
        try {
            const id = await AsyncStorage.getItem('idusuario');
            setIdUsuario(id);

            if (id) {
                const usuarioaux = await buscarUsuario(id);
                setUsuario({ ...usuarioaux.result });

                try {
                    const enderecoaux = await buscarEndereco(id);

                    // Preencher os campos mesmo que estejam vazios
                    setEndereco({
                        endereco: enderecoaux.result.endereco || '',
                        cidade: enderecoaux.result.cidade || '',
                        estado: enderecoaux.result.estado || '',
                        cep: enderecoaux.result.cep || '',
                    });
                } catch (error) {
                    console.warn('Nenhum endereço encontrado para o usuário.');
                    setEndereco({
                        endereco: '',
                        cidade: '',
                        estado: '',
                        cep: '',
                    });
                }
            }

            setLoading(false);
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
    }

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const fetchUserData = async () => {
        try {
            if (usuario) {
                setValue('nome', usuario.nome);
                setValue('cpf', usuario.cpf);
                setValue('email', usuario.email);
            }

            if (endereco) {
                setValue('endereco', endereco.endereco);
                setValue('cidade', endereco.cidade);
                setValue('estado', endereco.estado);
                setValue('cep', endereco.cep);
            }
        } catch (err) {
            toast.show({
                title: 'Erro!',
                description: 'Não foi possível carregar os dados.',
                backgroundColor: 'red.500',
            });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [usuario, endereco]);

    const onSubmit = async (data) => {
        console.log('Dados enviados para atualização:', data);

        try {
            // Obter os dados atuais do usuário para preservar `senha` e `dataCadastro`
            const cleanCpf = removeCpfMask(data.cpf);
            const usuarioAtual = await buscarUsuario(idusuario);

            if (!usuarioAtual || !usuarioAtual.result) {
                throw new Error('Usuário não encontrado para atualização');
            }

            const { senha, dataCadastro, isActive, role } = usuarioAtual.result;

            const resultadoUsuario = await atualizarUsuario(idusuario, {
                nome: data.nome,
                cpf: cleanCpf || usuario.cpf,
                email: data.email,
                isActive: isActive || 1, // Preservar ou definir valor padrão
                role: role || 'normal', // Preservar ou definir valor padrão
                senha, // Preservar a senha atual
                dataCadastro, // Preservar a data de cadastro
            });

            // Registrar ou atualizar o endereço
            const resultadoEndereco = await atualizarEndereco({
                usuarioId: idusuario,
                endereco: data.endereco,
                cidade: data.cidade,
                estado: data.estado,
                cep: data.cep,
            });

            if (resultadoUsuario && resultadoEndereco) {
                toast.show({
                    title: 'Sucesso!',
                    description: 'Usuário e endereço atualizados com sucesso.',
                    backgroundColor: 'green.500',
                });
                navigation.goBack();
            } else {
                toast.show({
                    title: 'Erro!',
                    description: 'Não foi possível atualizar os dados.',
                    backgroundColor: 'red.500',
                });
            }
        } catch (err) {
            console.error('Erro ao atualizar:', err);
            toast.show({
                title: 'Erro!',
                description: 'Erro interno ao tentar atualizar os dados.',
                backgroundColor: 'red.500',
            });
        }
    };

    if (loading) {
        return <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando dados...</Text>;
    }

    return (
        <ScrollView flex={1} p={5}>
            <VStack flex={1} alignItems="center" p={5} justifyContent="center">
                <Box>
                    <Controller
                        control={control}
                        name="nome"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="Nome" placeholder="Digite seu nome" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.nome && <Text style={{ color: 'red' }}>{errors.nome.message}</Text>}

                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { onChange, value } }) => (
                            <FormControl mt={3}>
                                <FormControl.Label>CPF</FormControl.Label>
                                <MaskInput
                                    mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                    value={value}
                                    onChangeText={onChange}
                                    style={{
                                        fontSize: 16,
                                        width: 312,
                                        borderRadius: 8,
                                        backgroundColor: '#F3F3F3',
                                        padding: 10,
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                        shadowColor: '#000',
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                    }}
                                    placeholder="Digite seu CPF"
                                />
                            </FormControl>
                        )}
                    />
                    {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="E-mail" placeholder="Digite seu e-mail" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

                    <Controller
                        control={control}
                        name="endereco"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="Endereço" placeholder="Digite seu endereço" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.endereco && <Text style={{ color: 'red' }}>{errors.endereco.message}</Text>}

                    <Controller
                        control={control}
                        name="cidade"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="Cidade" placeholder="Digite sua cidade" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.cidade && <Text style={{ color: 'red' }}>{errors.cidade.message}</Text>}

                    <Controller
                        control={control}
                        name="estado"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="Estado" placeholder="Digite seu estado" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.estado && <Text style={{ color: 'red' }}>{errors.estado.message}</Text>}

                    <Controller
                        control={control}
                        name="cep"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="CEP" placeholder="Digite seu CEP" value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.cep && <Text style={{ color: 'red' }}>{errors.cep.message}</Text>}
                </Box>

                <Button w="100%" bg="blue.500" my={5} borderRadius="lg" onPress={handleSubmit(onSubmit)}>
                    Atualizar
                </Button>
            </VStack>
        </ScrollView>
    );
}
