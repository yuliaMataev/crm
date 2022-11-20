
export class Contact {
    fullname: string;
    email: string;
    birthday: string;
    phone: string;

    constructor (
        fullname: string = '',
        email: string = '',
        birthday: string = '',
        phone: string = '',
    ) {

        this.fullname = fullname;
        this.email = email;
        this.birthday =birthday
        this.phone = phone;       
    }
    
    

    static fromFirebaseToCkass(data:any){
        return new Contact(
            data.fullname || '',
            data.email || '',
           data.birthday || '',
            data.phone || '',
        )
    }
}
