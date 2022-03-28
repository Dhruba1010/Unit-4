const connect = require('./configs/db');

const app = require('./index');

app.listen(2244, async () => {
    try {
        await connect();
    }
    catch(err){
        console.log(err);;
    }
    console.log('listening on port 2244');
});
