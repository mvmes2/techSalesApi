export class CustomerCpfAlreadyExists extends Error {
    constructor() {
        super('Este Cpf do cliente já está em uso.')
        this.name = 'CustomerCpfAlreadyExists';
    }
}