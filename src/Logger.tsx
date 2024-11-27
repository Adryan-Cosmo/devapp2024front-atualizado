import { logger, fileAsyncTransport } from 'react-native-logs';
import * as FileSystem from 'expo-file-system';

const logFilePath = `${FileSystem.documentDirectory}log.txt`;

const writeLog = async (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    try {
        await FileSystem.writeAsStringAsync(logFilePath, logMessage, {
            encoding: FileSystem.EncodingType.UTF8,
        });
    } catch (error) {
        console.error('Erro ao escrever o log no arquivo:', error);
    }
};

const readLogFile = async () => {
    try {
        const content = await FileSystem.readAsStringAsync(logFilePath, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        console.log('🚀 ~ readLogFile ~ content:', content);
    } catch (error) {
        console.log('🚀 ~ readLogFile ~ error: Erro ao ler arquivo', error);
    }
};

const config = {
    severity: 'debug',
    transport: (msg) => {
        writeLog(msg.message);
    },
    transportOptions: {
        colors: {
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
            debug: 'greenBright',
        },
    },
    // async: true,
    // dateFormat: 'time',
    // printLevel: true,
    // printDate: true,
    // fixedExtLvlLength: false,
    // enabled: true,
};

const log = logger.createLogger(config);

log.info('Esta é uma mensagem de log de informação');
log.warn('Esta é uma mensagem de aviso');
log.error('Esta é uma mensagem de erro');

export function logInfo(msg: string) {
    log.info(msg);
}

export function logError(msg: string) {
    log.error(msg);
}

export function logWarn(msg: string) {
    log.warn(msg);
}

export default log;
