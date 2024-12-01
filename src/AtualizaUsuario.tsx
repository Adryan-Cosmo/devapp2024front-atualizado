import React, { useEffect, useState } from 'react';
import { VStack, Box, Button, FormControl, ScrollView, Text, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EntradaTexto } from './componentes/EntradaTexto';
import MaskInput from 'react-native-mask-input';
import { buscarUsuario, atualizarUsuario } from './servicos/usuario';
import { useNavigation } from '@react-navigation/native';
import { logInfo, logError } from './Logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({
    nome: yup
        .string()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome inválido')
        .test('nome-completo', 'Informe o nome completo', (value) => value && value.trim().split(' ').length >= 2)
        .required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

export default function AtualizaUsuario() {
    const navigation = useNavigation();
    const toast = useToast();
    const [loading, setLoading] = useState(true);

    const [idusuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState({} as any);

    useEffect(() => {
        obtemUsuario();
    }, []);

    async function obtemUsuario() {
        try {
            const id = await AsyncStorage.getItem('idusuario');
            setIdUsuario(id);
            if (id !== null) {
                const usuarioaux = await buscarUsuario(id);
                setUsuario({ ...usuarioaux.result });
            }
        } catch (error) {
            console.log(error);
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
                setLoading(false);
            } else {
                toast.show({
                    title: 'Erro!',
                    description: 'Usuário não encontrado.',
                    backgroundColor: 'red.500',
                });
                navigation.goBack();
            }
        } catch (err) {
            // logError(`Erro ao buscar usuário: ${err.message}`);
            toast.show({
                title: 'Erro!',
                description: 'Não foi possível carregar os dados do usuário.',
                backgroundColor: 'red.500',
            });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onSubmit = async (data) => {
        console.log('Dados enviados para atualizarUsuario:', data);
        try {
            const resultado = await atualizarUsuario(idusuario, data);
            if (resultado) {
                toast.show({
                    title: 'Sucesso!',
                    description: 'Usuário atualizado com sucesso.',
                    backgroundColor: 'green.500',
                });
                // logInfo(`Usuário atualizado com sucesso: ${data.email}`);
                navigation.goBack();
            } else {
                toast.show({
                    title: 'Erro!',
                    description: 'Não foi possível atualizar o usuário.',
                    backgroundColor: 'red.500',
                });
            }
        } catch (err) {
            // logError(`Erro ao atualizar usuário: ${err.message}`);
            toast.show({
                title: 'Erro!',
                description: 'Erro ao tentar atualizar o usuário.',
                backgroundColor: 'red.500',
            });
        }
    };

    if (loading) {
        return <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando dados do usuário...</Text>;
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
                </Box>

                <Button w="100%" bg="blue.500" my={5} borderRadius="lg" onPress={handleSubmit(onSubmit)}>
                    Atualizar
                </Button>
            </VStack>
        </ScrollView>
    );
}
