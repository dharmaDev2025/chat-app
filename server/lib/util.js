import jwt from "jsonwebtoken"

//generte
export  const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET);
    return token;

}