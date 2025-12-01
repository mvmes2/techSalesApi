
export class CustomerNotFoundWithEmail extends Error {
    constructor(){
        super('Nenhum cliente com este email foi encontrado.')
    }
}