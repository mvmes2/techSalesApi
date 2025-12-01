
export class CustomerNotFoundWithID extends Error {
    constructor(){
        super('Este cliente não foi encontrado.')
    }
}