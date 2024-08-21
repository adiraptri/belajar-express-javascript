import express, { Router } from 'express';

// import dotenv from "dotenv"
// dotenv.config();
// const PORT = process.env.PORT;
// import bodyParser from 'body-parser';
// import router from './routes/routes.js'

// import bodyParser from 'body-parser';
// import router from './routes/routes.js';

const app = express();
// app.use(bodyParser.urlencoded({ extended: false}))
// app.use(bodyParser.json());

// app.use("/", router);
// app.listen(PORT, () => {
//     console.log("server berjalan di http://localhost" + PORT);
// });

const port = 3000;
import db from './Connection.js';
// import res from 'express/lib/response.js';




app.get("/", (req, res) =>{
    const sql = 'SELECT * FROM MAHASISWA';
    db.query(sql, (error, result)=> {

        res.json(result);
        // res.send("tes")
        console.log(result)
    })
});

app.get("/find", (req, res)=>{
    const sql = 'SELECT * FROM mahasiswa WHERE NIM = ${req.query.NIM}'; //nim di ${req.query.NIM} harus sama seperti di db
    db.query(sql, (error, result) =>{
        res.json(result); 
    });
});



// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.post("/create", (req, res) =>{
    const {NIM, Nama, Jurusan, alamat} = req.body;
    const sql = 'INSERT INTO MAHASISWA (NIM, Nama, Jurusan, alamat) VALUES (?, ?, ?, ?)';
    db.query(sql, [NIM, Nama, Jurusan, alamat], (error, result) =>{
        if(error){
            res.status(404)
            res.send(error)
        };
        res.status(201);
        res.json(result);
    });
});

app.delete("/delete", (req, res) =>{
    const nim = req.query.nim;
    const sql = 'DELETE FROM MAHASISWA WHERE NIM = ?';
    db.query(sql, [NIM], (error, result) =>{
        if(error){
            res.status(404)
            res.send(error)
        };
        res.status(200);
        res.json('Data berhasil dihapus');
    }); 
})

// app.put("/update", (req,res) => {
//     const nim = req.query.nim;
//     const {nama_lengkap, kelas, alamat} = req.body ;
//     if (nim || nama_lengkap || kelas || alamat) {
//         const query = 'UPDATE mahasiswa SET nama_lengkap = *${kelas}*, alamat= *{alamat}* WHERE nim = ${nim}';
//         db.query(query, (error, result) => {
//             if (error) res.status(400).send(error.messege);
            
//             res.json(result);
//         })
//     }
// });

// app.use("/", router)
// app.put("/update", router)


// app.listen (3000, {} => {
//         console.log("server berjalan di http://localhost/3000");
//     });
    app.listen(port, () =>{
        console.log("server running on port " + port );
    });