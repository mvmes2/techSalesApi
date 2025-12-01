export class NotAllowedAnnotherCompany extends Error {
    constructor() {
        super('Não é permitido ver ou modificar informações de usuários de uma empresa a qual nnão te pertence.')
    }
}