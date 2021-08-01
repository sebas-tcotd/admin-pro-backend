const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('✅ Base de datos online.');
    } catch (error) {
        throw new Error('❌ ¡Oh no! Hubo un error al iniciar la base de datos. :(');
    }
}

module.exports = {
    dbConnection
}
