import { logger } from 'react-native-logs';

const config = {
    severity: 'debug',
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
