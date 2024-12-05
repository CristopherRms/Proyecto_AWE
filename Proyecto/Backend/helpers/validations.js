class Validations{
    static username (username){
        if (typeof username!== 'string')throw new Error("debe de ser una cadena");
        if (username.length<5)throw new Error("debe tener al menos 5 caracteres");
    }
    static password(password){
        if (typeof password!== 'string')throw new Error("debe de ser una cadena");
        if (password.length<8)throw new Error("debe tener al menos 8 caracteres");
    }
}
module.exports= {Validations}