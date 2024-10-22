const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.post('/api/todos', (req, res) => {
    try {
        const { title, description } = req.body;
        const query = `INSERT INTO todo(title, description) VALUES($1, $2) RETURNING *`;
        const values = [title, description];

        pool.query(query, values, (err, data) => {
            if (err) {
                console.log(err);
                res.send('error');
            }
            res.json(data);
        });
    } catch (error) {
        console.log(error);
        res.send('error');
    }
})

app.get('/api/getTodos', (req, res) => {
    try {
        const query = `SELECT * from todo`;
        pool.query(query, (err, data) => {
            if (err) console.log(err);
            res.json(data.rows);
        })
    } catch (error) {
        console.log(error);
        res.send('error');
    }
})

app.get('/api/getTodo/:id', (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * from todo WHERE todo_id = $1`;
        const values = [id];
        pool.query(query, values, (err, data) => {
            if (err) console.log(err);
            res.json(data.rows);
        })
    } catch (error) {
        console.log(error);
        res.send('error')
    }
})

app.put('/api/updateTodo/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const query = `UPDATE todo SET title = $1, description = $2 WHERE todo_id = $3`
        const values = [title, description, id];
        pool.query(query, values, (err, data) => {
            if (err) console.log(err);
            res.json(data);
        })
    } catch (error) {
        console.log(error);
        res.send('error')
    }
})

app.delete('/api/deleteTodo/:id', (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE from todo WHERE todo_id = $1`;
        const values = [id];
        pool.query(query, values, (err, data) => {
            if (err) console.log(err);
            res.json(data);
        })
    } catch (error) {
        console.log(error);
        res.send('error');
    }
})

app.listen(8000, () => {
    console.log('listening on port 8000');
});