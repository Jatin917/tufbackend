import express from 'express';
import { createCard, deleteCard, getCards } from './config/db.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/cards', async (req, res)=>{
    try {
        const result = await getCards();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
    // return result;
});

app.post('/card', async (req, res)=>{
    try {
        const {title, contents} = req.body;
        const result = await createCard(title, contents);
        res.send(result);
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
});
app.delete('/card/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const result = await deleteCard(id);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})
app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})