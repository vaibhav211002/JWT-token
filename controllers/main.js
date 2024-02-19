const jwt = require('jsonwebtoken')
const errorcustom = require('../errors/custom-error')
const login = async (req,res) =>{
    const {username,password} = req.body ;
    console.log(username,password);
    if(!username || !password){

        throw new errorcustom('Please Provide the Username and Password',400)


    }
    const id = new Date().getDate();
    const  token = jwt.sign({username,id},process.env.jwt_secret,{expiresIn:'30d'});

    res.status(200).json({msg:'user created',token})
}

const dashboard = async(req,res) =>{

    const autheader = req.headers.authorization;
    console.log(autheader);
    if(!autheader || !autheader.startsWith('Bearer ')){
        throw new errorcustom('No Tokens Were Found',401);
    }
    const token = autheader.split(' ')[1];
    console.log(token);

    try {
        const code = jwt.verify(token,process.env.jwt_secret);
        console.log(code);
        const luckynumber = Math.floor(Math.random()*100);
    res.status(200).json({msg:`hello ${code.username}`,secret:`here is your secrent number ${luckynumber}`})
        
    } catch (error) {
        throw new errorcustom('Provide a valid JWT token',401);
        
    }
    
}

module.exports = {login,dashboard}