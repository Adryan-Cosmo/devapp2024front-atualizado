import { VStack, Image, Box, FormControl, Button, useToast, ScrollView, Text, Modal } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Logo from './assets/dolly-fish.png';
import { TEMAS } from './estilos/temas';
import { Titulo } from './componentes/Titulo';
import { usuarios } from './utils/CadastroUsuarioTexto';
import { EntradaTexto } from './componentes/EntradaTexto';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MaskInput from 'react-native-mask-input';
import { cadastrarUsuario } from './servicos/usuario';
import { hashSenha } from './Criptografia';
// import { logInfo, logError } from './Logger';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

const removeCpfMask = (cpf) => cpf.replace(/\D/g, '');

export default function CadastroUsuario() {
    const navigation = useNavigation();
    const toast = useToast();
    const [isDirty, setIsDirty] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState(null);

    const schema = yup.object().shape({
        nome: yup
            .string()
            .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome inválido')
            .test('nome-completo', 'Informe o nome completo', (value) => value && value.trim().split(' ').length >= 2)
            .required('Nome é obrigatório'),
        cpf: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        senha: yup
            .string()
            .min(8, 'Senha deve ter pelo menos 8 caracteres')
            .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
            .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
            .matches(/\d/, 'A senha deve conter pelo menos um número')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
            .required('Senha é obrigatória'),
        confirmacao: yup
            .string()
            .oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais!')
            .required('Confirmação de senha é obrigatória'),
    });

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleCadastro = async (data) => {
        try {
            const senhaHash = await hashSenha(data.senha);
            const cleanCpf = removeCpfMask(data.cpf);
            console.log('Dados para cadastro:', {
                cpf: cleanCpf,
                nome: data.nome,
                email: data.email,
                senha: senhaHash,
                isActive: 1,
                role: '',
            });
            const resultado = await cadastrarUsuario({
                cpf: cleanCpf,
                nome: data.nome,
                email: data.email,
                senha: senhaHash,
                isActive: 1,
                role: '',
            });
            // logInfo(`Tentativa de cadastro do usuário: ${data.email}`);
            console.log('Resultado do cadastro:', resultado);

            if (!resultado) {
                toast.show({
                    title: 'Usuário não cadastrado!',
                    description: 'O Usuário não foi cadastrado! Verifique os campos!',
                    backgroundColor: 'red.500',
                });
            } else {
                // logInfo(`Cadastro realizado com sucesso para o usuário: ${data.email}`);
                toast.show({
                    title: 'Usuário Cadastrado!',
                    description: 'O Usuário foi cadastrado com sucesso!',
                    backgroundColor: 'green.500',
                });
                reset();
                setIsDirty(false);
            }
        } catch (err) {
            // logError(`Erro ao cadastrar usuário: ${err.message}`);
            toast.show({
                title: 'Erro!',
                description: 'Ocorreu um erro durante o cadastro. Tente novamente.',
                backgroundColor: 'red.500',
            });
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (!isDirty) setIsDirty(true);
        });
        return () => subscription.unsubscribe();
    }, [control, isDirty]);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (isDirty) {
                    setModalVisible(true);
                    return true;
                }
                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => backHandler.remove();
        }, [isDirty])
    );

    return (
        <ScrollView flex={1} p={5}>
            <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content>
                    <Modal.Header>Confirmação</Modal.Header>
                    <Modal.Body>Você tem mudanças não salvas. Tem certeza de que deseja sair?</Modal.Body>
                    <Modal.Footer>
                        <Button.Group>
                            <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
                            <Button
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.goBack();
                                }}>
                                Sair
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <VStack flex={1} alignItems="center" p={5} justifyContent="center">
                <Image source={Logo} alt="Logo do aplicativo Aquigest" />
                <Titulo>{usuarios.titulo}</Titulo>
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
                            <FormControl mt={3}>
                                <FormControl.Label>E-mail</FormControl.Label>
                                <MaskInput
                                    mask={null}
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
                                    placeholder="Digite seu e-mail"
                                />
                            </FormControl>
                        )}
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

                    <Controller
                        control={control}
                        name="senha"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto label="Senha" placeholder="Digite sua senha" secureTextEntry value={value} onChangeText={onChange} />
                        )}
                    />
                    {errors.senha && <Text style={{ color: 'red' }}>{errors.senha.message}</Text>}

                    <Controller
                        control={control}
                        name="confirmacao"
                        render={({ field: { onChange, value } }) => (
                            <EntradaTexto
                                label="Confirmar senha"
                                placeholder="Digite novamente sua senha."
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.confirmacao && <Text style={{ color: 'red' }}>{errors.confirmacao.message}</Text>}
                </Box>

                <Button w="100%" bg={TEMAS.colors.blue[800]} my={5} borderRadius="lg" onPress={handleSubmit(handleCadastro)}>
                    Cadastrar
                </Button>
            </VStack>
        </ScrollView>
    );
}
