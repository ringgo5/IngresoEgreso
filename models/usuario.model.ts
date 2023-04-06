export class Usuario{


    static fromFirebase({email,nombre,uid}){ //tal como lo tenemos en nuestro firebase

        return new Usuario(uid,nombre,email)//lo dejamos como tenemos nuestro modelo(abajo) para poder usarlo

    }

    constructor(
        public uid:string,
        public nombre: string,
        public email: string
    ){}
}