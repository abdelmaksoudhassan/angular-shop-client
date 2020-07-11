export class User{
    constructor(public email:string,public localId:string,public idToken:string,public expDate:number){
        this.email=email;
        this.expDate=expDate;
        this.localId=localId;
        this.idToken=idToken;
    }
}