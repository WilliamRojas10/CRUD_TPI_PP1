const express = require('express');

const listaPersonas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from persona";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista" });
    })
};

const agregarPersona = function(req, res, next) {
    res.render('agregarPersona', { title: "Agregar" }); //para renderizar a la plantilla agregarPersona.ejs
};
//ESTAS DOS FUNCIONES SON UN CONJUNTO PARA QUE FUNCIONE CORRECTAMENTE EL AGREGAR PERSONA. UNO MUESTRA Y EL OTRO REALIZA LOS CAMBIOS Y LUEGO REDIRECCIONA A UNA RUTA ESPECIFICADA

const postAgregarPersona = function(req, res, next) { //req (objeto de solicitud), res (objeto de respuesta) y next (función de paso al siguiente middleware)
    const db = req.app.get("db");
    var nombre = req.body.nombre;
    var email = req.body.email;
    var id_oficina = req.body.id_oficina;
    const query = "INSERT INTO persona (nombre, email, id_oficina) VALUES (?, ?, ?)";
    const values = [nombre, email, id_oficina];
    db.query(query, values, function(err) { // le expecificamos la consulta y que columnas queremos que complete
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/personas');// En caso que todo salga bien anda a la ruta "agregarPersona"
    })
};

const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit', { item: rows[0], title: "Editar" });
    });
};

const postUpdatePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email; // Obtén la descripción del formulario
    db.query("UPDATE persona SET nombre=?, email=? WHERE id=?", [nombre, email, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
};

const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar" });
    });
};

const postDeletePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM persona WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
};

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar Persona" });
};

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM persona WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados', { personas: rows, title: "Resultados" })
    });
};

module.exports = {
    listaPersonas,
    agregarPersona,
    postAgregarPersona,
    getEditarPersona,
    postUpdatePersona,
    getDeletePersona,
    postDeletePersona,
    buscarPersona,
    buscarPersonaResultados
}