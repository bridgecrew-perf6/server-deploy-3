const db = require("../config/db")

const { hash } = require("bcrypt")

module.exports ={
    async create(req, res){
        const { name, email, password, cnpj, cep } = req.body;

        if(!name) return res.status(400).send("Preencha o campo Nome")
        if(!email) return res.status(400).send("Preencha o campo Email")
        if(!password || password.length < 6) return res.status(400).send("A senha não pode ser menos que 6 caracteres")

        const userEmail = await db.query(`SELECT email FROM users WHERE email =  '${email}'`)


        if(!userEmail.rows[0]){
            
        
            const query = `INSERT INTO users (
                name,
                email,
                password,
                cnpj,
                cep
                )VALUES($1, $2, $3, $4, $5)` 
    
            const passwordHash = await hash(password, 8)
    
            const values = [
                name,
                email,
                passwordHash,
                cnpj,
                cep
            ] 
    
            await db.query(query, values)

            res.status(200).send("Usuário cadastrado")
            console.log("Usuario Cadastrado com sucesso")
        }else{
            
            res.status(400).send("Este email já está sendo usado")
            
        }


      
        


        
        
        
        
    },
}