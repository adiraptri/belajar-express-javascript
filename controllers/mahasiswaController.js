import db from "../Connection.js";

export const getMahasiswa = (req, res) => {
    const mahasiswa = req.query.mahasiswa
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (error, result) => {
        res.json(result)
    });
};

export const getMahasiswaByNim = (req, res) => {
    //menangkap data query url
    const nim = req.query.nim;
    //menangkap semua data dari table mahasiswa berdasarkan nim
    const sql = 'SELECT * FROM mahasiswa WHERE nim = ${nim}';
    //mengirim query ke database sql
    db.query(sql,(error, result) => {
    //mengirim data hasil ke client browser
        res.json(result);
    });
};

export const createMahasiswa = () => {
    //menangkap body dari response yang dikirim oleh thunder client
    const {NIM, Nama, Jurusan, alamat} = req.body;
    //insert ke mahasiswa dengan nilai nim, nama lengkap, kelas, alamat dari body
    const sql = 'INSERT INTO MAHASISWA (NIM, Nama, Jurusan, alamat) VALUES (?, ?, ?, ?)';
    db.query(sql, [NIM, Nama, Jurusan, alamat], (error, result) =>{
        //jika terdapat error
        if(error){
            res.status(404)
            res.send(error)
        };
        //jika tidak error
        res.status(201);
        res.json(result);
});
};
export const editMahasiswa = (req, res) => {
    const nim = req.query.nim;

    const {nama_lengkap, kelas, alamat } = req.body
    if (nim || nama_lengkap || kelas || alamat){
        const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat = "${alamat}"WHERE nim = ${nim}`;
        db.query(query, (error, result) => {
            if(error)
                res.statue (400).send(error.message);

            res.json(result)
        })
     }
}


// module.exports = {
//     getMahasiswa,
// }