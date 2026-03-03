import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (_req, res) => {
	res.send({ message: 'Hello from Classroom API' });
});


app.listen(PORT, () => {
	console.log(`Server started — http://localhost:${PORT}`);
});

