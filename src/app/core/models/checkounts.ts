import { User } from "./users";

export class CheckOunt{
    name: string;
    description: string;
    currency: string;
    users: Array<User>
    usersMails: Array<User>

    constructor(name, description="",currency="",users=[]){
        this.name =  name
        this.description =  description
        this.currency =  currency
        this.users =  users
        for(var user of users){
            this.usersMails.push(user.email)
        }
    }
}