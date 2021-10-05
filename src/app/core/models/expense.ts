import { payer } from "./payer";

//Registro de un gasto
export class expense {
    checkOuntID: string
    //id de quien desembolsa el pago
    userID: string;
    concept: string;
    amount: number;
    payers: Array<payer>
    constructor(userID, concept = "", amount = 0, payers) {
        this.userID = userID
        this.concept = concept
        this.amount = amount
        this.payers = payers
    }
}