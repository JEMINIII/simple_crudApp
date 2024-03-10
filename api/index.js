import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql2.createConnection({
    host : "localhost",
    user : "root",
    password : "jemini@#123",
    database : "mydatabase"
})

app.get("/",(req,res)=>{
    const q = "SELECT * FROM customers";
    db.query(q,(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.post("/customer",(req,res)=>{
    const q = "INSERT INTO customers (`name`,`address`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.address
    ]
    db.query(q,[values],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.get("/read/:id",(req,res)=>{
    const q = "SELECT * FROM customers WHERE id = ?";
    const id = req.params.id;

    db.query(q,[id],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.put('/update/:id',(req,res)=>{
    const q = "UPDATE customers SET `name`=?,`address`=? WHERE id=?";
    const id = req.params.id;
    db.query(q,[req.body.name,req.body.address,id],(err,result) => {
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.delete("/delete/:id",(req,res)=>{
    const q = "DELETE FROM customers WHERE id = ?";
    const id = req.params.id;

    db.query(q,[id],(err,result) => {
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.listen(8081,()=>{
    console.log("listening")
})