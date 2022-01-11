const db = require("../config/db")



module.exports ={
    async create(req, res){
        const { url, title, price, description } = req.body;

       
        
            const query = `INSERT INTO products (
                url,
                title,
                price,
                description
                )VALUES($1, $2, $3, $4)`
    
            
    
            const values = [
                url,
                title,
                price,
                description
            ]
    
            await db.query(query, values)
            res.status(200).send("Produto cadastrado")
    },
    async show(req, res){
        const data = await db.query(`SELECT id, url, title, price, description FROM products ORDER BY id`)

        console.log(data[0])
        return res.send(data.rows)
    },
    async showOne(req, res){
        const { id } = req.params

        const data = await db.query(`SELECT id, url, title, price, description FROM products WHERE id = '${id}'`)

        return res.send(data.rows)
    }
}