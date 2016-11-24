import * as express from 'express';


const app = express();
const port = 0; // dynamic
const host = 'localhost';


app.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!' });
});



export const uriAsPromise = new Promise<string>((resolve, reject) => {
  const server = app.listen(port, host, (err) => {
    if (err) {
      reject(err);
      throw err;
    }
    console.log('Example app listening on port 3000!');
    console.log(server.address());
    const uri = 'http://' + server.address().address + ':' + server.address().port + '/';
    console.log(uri);
    resolve(uri);
  });
});
