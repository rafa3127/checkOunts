export class pay {
    userID: string;
    //id de quien desenbolsa el pago
    amount: number;
    receptorID: string;
    checkOuntID: string
    //id de quien tecibe el pago
    constructor(userID, amount = 0, receptorID) {
        this.userID = userID
        this.amount = amount
        this.receptorID = receptorID
    }
}