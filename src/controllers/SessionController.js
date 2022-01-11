const db = require("../config/db")

const jwt = require('jsonwebtoken');

const { compare } = require('bcrypt')

module.exports ={ 
    async create(req, res){
        const { email, password } = req.body

        const userData = await db.query(`SELECT * FROM users WHERE email =  '${email}'`)

        const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

        if(!userData.rows[0]){
            

            res.status(400).send("Email não cadastrado")
            console.log("Email não cadastrado")
        }else{
            
            const passed = await compare(password, userData.rows[0].password)

            console.log(userData.rows[0].password)

            if(!passed){
                res.status(400).send("Senha incorreta")
                console.log("senha errada")
            }else{

                let token = jwt.sign({ _id: userData.rows[0].id }, key,{
                    expiresIn: "7d"
                })

                res.json({
                    token,
                    user: {
                        _id: userData.rows[0].id,
                        name: userData.rows[0].name,
                        email: userData.rows[0].email,
                    }
                    

                })


                console.log("Logado")
            }

            // console.log(userData.rows[0].password)
            
        }
    }
}