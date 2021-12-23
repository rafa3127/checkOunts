import { payer } from "./payer";

//Registro de un gasto
export class expense {
    checkOuntID: string
    userEmail: string;
    concept: string;
    amount: number;
    payers: Array<payer>
    constructor(userEmail, concept = "", amount = 0, payers) {
        this.userEmail = userEmail
        this.concept = concept
        this.amount = amount
        this.payers = payers
    }
}