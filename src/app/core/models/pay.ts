export class pay {
    userEmail: string;
    amount: number;
    receptorID: string;
    checkOuntID: string
    //id de quien tecibe el pago
    constructor(userEmail, amount = 0, receptorID) {
        this.userEmail = userEmail
        this.amount = amount
        this.receptorID = receptorID
    }
}