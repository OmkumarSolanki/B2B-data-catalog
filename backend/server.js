const app = require('./app');

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
