const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    //host: 'mysql',
    user: 'root',
    password: '123456789',
});

//Conectarnos al servidor
db.connect((err) => {
    if (err) {
        console.log("Error en la conexion al server");
        return;
    
    }

    // Verificar si existe la base de datos
    db.query("CREATE DATABASE IF NOT EXISTS trabajo", (err) => {
        if (err) {
            console.log("Error al crear la db");
            return;
        }
        console.log("DB creada o ya existente");
    });

    // Seleccionar base de datos
    db.query("USE trabajo", (err) => {
        if (err) {
            console.log("Error al seleccionar la db");
            return;
        }
        console.log("Conexion exitosa");
    });

    // Verificar si existe la tabla persona
    const createTablePersonaSQL = `
    CREATE TABLE IF NOT EXISTS persona (
        id BIGINT PRIMARY KEY auto_increment,
        nombre VARCHAR(255),
        email VARCHAR(255),
        id_oficina BIGINT,
        FOREIGN KEY (id_oficina) REFERENCES oficina(id)
    );
    `;

    const createTableOficinaSQL = `
    CREATE TABLE IF NOT EXISTS oficina (
        id BIGINT PRIMARY KEY,
        denominacion VARCHAR(255)
        ); 
`;

    db.query(createTablePersonaSQL, (err) => {
        if (err) {
            console.log("Error al crear la tabla");
            return;
        }
    });

    db.query(createTableOficinaSQL, (err) => {
        if (err) {
            console.log("Error al crear la tabla");
            return;
        }
    });


});

module.exports = db;