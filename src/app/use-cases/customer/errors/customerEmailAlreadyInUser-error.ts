export class CustomeremailAlreadyInUse extends Error {
    constructor() {
        super('Este email já está em uso.')
        this.name = 'CustomeremailAlreadyInUse';
    }
}