import bcrypt from 'react-native-bcrypt';

export async function hashSenha(senha: string, saltRounds: number = 12): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            // Gerar o salt diretamente com bcrypt
            const salt = bcrypt.genSaltSync(saltRounds);

            // Gerar o hash
            bcrypt.hash(senha, salt, (err, hash) => {
                if (err) {
                    reject(new Error('Erro ao gerar o hash da senha.'));
                    return;
                }
                resolve(hash);
            });
        } catch (error) {
            reject(new Error(`Erro ao gerar o salt ou o hash: ${error.message}`));
        }
    });
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(senha, hash, (err, result) => {
            if (err) {
                reject(new Error('Erro ao verificar a senha.'));
                return;
            }
            resolve(result);
        });
    });
}
