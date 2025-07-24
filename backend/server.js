const app = require('./app');

const PORT = process.env.PORT || 5000;

const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
