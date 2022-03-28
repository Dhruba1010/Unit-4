const app = require('./index');

const connect = require('./configs/db');

app.listen(2244, async () => {
    try {
        await connect();
    }
    catch (err){
        console.log({message: err.message});
    }
    console.log('listening on port 2244');
});