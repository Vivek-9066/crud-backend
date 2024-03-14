import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://crudoperationtask.netlify.app"
]
app.use(cors({
    origin:allowedOrigins
}));

app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee_records"
});


app.get("/api/users/all",(req,res)=>{
    const sql = "SELECT * FROM user ";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Something went wrong!",err});
        return res.json(result);
    })
});

app.post("/api/users/add",(req,res)=>{
    const sql = "INSERT INTO user (`full_name`,`email`,`designation`) VALUES (?)";
    const values = [
        req.body.fullName,
        req.body.email,
        req.body.designation
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json({Message:"Something went wrong!"});
        return res.json(result);
    })
});

app.get("/api/user/:id",(req,res)=>{
    const sql = "SELECT * FROM user WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Something went wrong!"});
        return res.json(result);
    })
});

app.put("/api/users/update/:id",(req,res)=>{
    const sql = 'UPDATE user SET `full_name` = ? , `email` = ? ,`designation` = ? WHERE id = ?';
    const id = req.params.id;
    
    db.query(sql,[req.body.fullName,req.body.email,req.body.designation,id],(err,result)=>{
        if(err) return res.json({Message:"Something went wrong!"});
        return res.json(result);
    })
});

app.delete("/api/users/delete/:id",(req,res)=>{
    const sql = 'DELETE FROM user WHERE id = ?';
    const id = req.params.id; 
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Something went wrong!"});
        return res.json(result);
    })
})









app.listen(8080,()=>{
    console.log("listening on port 8080",)
})