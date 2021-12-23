export class User{
    id: string;
    name: string;
    balance: number;
    email: string;
    expenses: number
    constructor(id, name = "", balance=0,email="", expenses = 0){
        this.name=name
        this.balance=balance
        this.email=email
        this.expenses = expenses
    }
}