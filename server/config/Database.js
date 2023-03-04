import { Sequelize } from "sequelize";

const db = new Sequelize("software_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

if(db){
    console.log("Database connection started");
}

export default db;
