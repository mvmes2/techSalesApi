export class CustomerAlreadyExists extends Error {
    constructor() {
        super('Este email do cliente já está em uso.')
    }
}