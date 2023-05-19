const express = require('express');

const userRouter = require('./routes/users');

const app = express();
const PORT = 5005;

app.use(express.static('public'));
app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => console.log('Server listening at http://localhost:5005'));
