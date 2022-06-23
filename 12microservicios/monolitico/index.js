const servidor = require('./src/app')

servidor.listen(process.env.PORT || 3000, ()=> {
    console.log(`listening on port Monolitico ${process.env.PORT}`);

    })