const { response, request } = require("express");
const { UserRepository } = require("../repositories/User");
const { Validations } = require("../helpers/validations");
const bcrypt= require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const login  =async(req=request, res=response)=>{
    const{username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({
            msg:"Datos invalidos"
        })
    }
    const user =await UserRepository.getOne({username:username});
    if(!user){
        return res.status(401).json({
            msg:"Usuario no existe"
        })
    }
    const validPassword=await bcrypt.compare(password,user.password);
    if(!validPassword){
        return res.status(401).json({
            msg:"Contraseña incorrecta"
        })
    }
    try{
        const { password: _, ...simpleUser}=user.toObject();
        const token=await generateJWT(username);
        res.status(200).json({
            msg:"Token Ok",
            token: token ,
            user:simpleUser
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Internal Error"
        })
    }
}

const register=async =async(req=request, res=response)=>{
    const{username,password}=req.body;
    const saltRound=process.env.SALT_ROUNDS||10;
    try{
        Validations.username(username);
        Validations.password(password);
    }catch(error){
        return res.status(400).json({
            msg:error.message
        })
    }
    try{
       const user  = await UserRepository.getOne({username:username})
       if(user){
            return res.status(400).json({
                msg:"Usuario ya existe"
            });
       }
       const hashedPassword = await bcrypt.hash(password,Number(saltRound));
       const newUser=await UserRepository.create({
            username: username,
            password: hashedPassword,
            role:"user"
       })
       const{password:_,...simpleUser}=newUser.toObject();
       res.status(200).json({
        msg:"usuario creado",
        user:simpleUser
        })
    }catch(error){
        return res.status(500).json({
            msg:"error"
        });
    }
}

module.exports={
    login,
    register

}