export class CompanyOrUserNotExists extends Error {
    constructor() {
        super('Este usuário ou empresa que você está tentando acessar não existem, tente refazer seu login clicando em sair e logando novamente.')
    }
}