//Quien debe pagar un gasto o una porción del mismo
export class payer {
    userName: string;
    userEmail: string;
    amount: number;
    constructor(userName, userEmail, amount) {
        this.userName = userName;
        this.amount = amount;
        this.userEmail = userEmail
    }
}