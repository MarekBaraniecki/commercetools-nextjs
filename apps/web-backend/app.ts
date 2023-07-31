import {getApplication} from 'commercetools-backend-for-frontend';


async function start() {

  //Tutaj uzycie API stworzenia apki, i zupelnie jak w fastify rejestrujemy co chcemy
  //Obowiazkowe pola url, method, a potem dodajemy ile chcemy i obiekty sa mergowane
  const server = getApplication([{
    url: '/example',
    method: 'POST',
    handler: function (request: FastifyRequest, response: FastifyReply) {
      response.code(200).send(request.body);
    },
  }]);

  server.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}

start();
