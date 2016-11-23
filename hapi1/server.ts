import * as Hapi from 'hapi';


export const server = new Hapi.Server();
server.connection({});

server.route({
  method: ['GET', 'POST'],
  path: '/hello',
  handler: function (request, reply) {
    console.log('body:', request.payload);
    console.log('query:', request.query);
    console.log('params:', request.params);
    console.log('headers:', request.headers);
    return reply({ message: 'hello world' + request.query['e'] });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
