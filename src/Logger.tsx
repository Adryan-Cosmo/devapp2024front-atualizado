import { logger } from 'react-native-logs';
import api from './servicos/api'; // Importa o serviço de API configurado

// Função para enviar log para o banco de dados
const sendLogToDatabase = async (userId: number, userName: string, itemId: number, itemName: string, action: string) => {
    try {
        // Estrutura do log
        const logData = {
            userId,
            userName,
            itemId,
            itemName,
            action,
            timestamp: new Date().toISOString(),
        };

        // Enviar log para a API
        await api.post('/api/logs', logData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Log enviado com sucesso:', logData);
    } catch (error) {
        console.error('Erro ao enviar log para o banco:', error);
    }
};

// Configuração do logger
const config = {
    severity: 'debug',
    transport: (msg) => {
        const { userId, userName, itemId, itemName, action } = msg.meta || {};
        sendLogToDatabase(userId, userName, itemId, itemName, action);
    },
    transportOptions: {
        colors: {
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
            debug: 'greenBright',
        },
    },
};

const log = logger.createLogger(config);

// Funções de log para diferentes ações
export function logInfo(userId: number, userName: string, itemId: number, itemName: string, action: string) {
    log.info(`Info: ${action}`, { userId, userName, itemId, itemName, action });
}

export function logError(userId: number, userName: string, itemId: number, itemName: string, action: string) {
    log.error(`Error: ${action}`, { userId, userName, itemId, itemName, action });
}

export function logWarn(userId: number, userName: string, itemId: number, itemName: string, action: string) {
    log.warn(`Warn: ${action}`, { userId, userName, itemId, itemName, action });
}

export default log;
