import bcrypt from 'react-native-bcrypt';
import { randomBytes } from 'crypto';

export async function hashSenha(senha: string): Promise<string> {
    const saltRounds = 10;

    bcrypt.setRandomFallback((bytes) => {
        return randomBytes(bytes);
    });

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(new Error('Erro ao gerar o salt.'));
            }

            bcrypt.hash(senha, salt, (err, hash) => {
                if (err) {
                    reject(new Error('Erro ao gerar o hash da senha.'));
                }

                resolve(hash);
            });
        });
    });
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(senha, hash, (err, result) => {
            if (err) {
                reject(new Error('Erro ao verificar a senha.'));
            }

            resolve(result);
        });
    });
}
