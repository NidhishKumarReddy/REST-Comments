const express = require('express');
const app = express();
const path = require('path');
const methodOveride = require('method-override');
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOveride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Nidhish',
        comment: 'lol u r looking like an idiot'
    },

    {
        id: uuid(),
        username: 'Ashrith',
        comment: 'U noob'
    },

    {
        id: uuid(),
        username: 'Kiran',
        comment: 'I beg u plzz delete it'
    },

    {
        id: uuid(),
        username: 'Lakesh',
        comment: 'GG ez pezz lemony squezzy'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});