//Quien debe pagar un gasto o una porción del mismo
export class payer {
    userID: string;
    userName: string;
    userEmail: string;
    amount: number;
    constructor(userID, userName, userEmail, amount) {
        this.userID = userID;
        this.userName = userName;
        this.amount = amount;
        this.userEmail = userEmail
    }
}