const { Router } = require('express');
const pool = require('../database');

const router = Router();

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('INSERT INTO links set ?', [newLink]);    
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const linksArray = await pool.query('SELECT * FROM links');
    const links = linksArray[0];
    res.render('links/list', {links});
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const linkArray = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    const { title, url, description } = linkArray[0][0];
    res.render('links/edit', {title, url, description, id});
    console.log(title);
});

router.post('/edit/:id', async(req, res) => {
    const id = req.params.id;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('UPDATE links set ? WHERE ID = ?', [newLink, id]);
    res.redirect('/links');
});

module.exports = router;