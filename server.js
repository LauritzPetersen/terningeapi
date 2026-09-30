const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer(async(req, res) => {

    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('welcome to Dice-API! visit /roll to throw the dice');
    }

    else if(req.method === 'GET' && req.url === '/roll'){
        const result = Math.floor(Math.random() * 6) + 1;

        let message = `You rolled a ${result}`;
        if (result === 6){
            message = `you rolled a ${result}, you won!`;
        }

        const time = new Date().toISOString();

        const responseData = {
            result: result,
            message: message,
            time: time
        };

        try {
            const logLine = JSON.stringify(responseData) + '\n';
            await fs.appendFile('data/rolls.log', logLine);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(responseData));
        } catch (error){
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({error: 'Something went wrong'}));
        }
    }

    else if(req.method === 'GET' && req.url === '/history'){
        try {
            const historyData = await fs.readFile('data/rolls.log', 'utf8');
            const historyArray = historyData.split('\n').filter(line => line.trim() !== '');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({history: historyArray}));
        } catch (error){
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({error: 'Something went wrong'}));
        }
    }
    else{
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'site doesnt exist' }));
    }
})
const port = 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
