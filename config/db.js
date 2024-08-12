import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host:process.env.SQL_HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise();

export const getCards = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM cards');
        return rows;
    } catch (error) {
        console.log("error ", error.message);
    }
} 

export const createCard = async (title, contents) => {
    try {
        const res = await pool.query(`INSERT INTO cards (title, contents) VALUES (?, ?)`, [title, contents]);
        if(res) return {status:200};
        return {status:401}
        
    } catch (error) {
        console.log("error while inserting data", error.message);
        return {status:500};
    }
}

export const deleteCard = async (id)=>{
    try {
        const res = await pool.query(`DELETE FROM cards where id = ?`,[id]);
        if(res) return {status:200};
        return {status:401}
    } catch (error) {
        console.log("error while deleting data", error.message);
        return {status:500};
    }
}

