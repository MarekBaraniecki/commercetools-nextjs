import fastify, { FastifyInstance, FastifyLoggerOptions, RouteGenericInterface } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import healthcheck from './services/healthcheck';
import { applySpec, groupBy, map, nth, pipe, prop, values } from 'rambda';


//To powinna byc raczej klasa, wtedy api typu
//const app = new App()
export const getApplication = (customRouting: Array<RouteGenericInterface>): FastifyInstance => {
  
  //Tutaj powinien sie znalezc jakis sprytny merge, chyba po urlach, gdzie customRouting wazniejsze
  //Casey: dodawanie pol do istniejacyhc routow, nadpisywanie pol (w tym preHandler, handler, postHandler) no i dodawnaie nowych
  const routing = {...customRouting, healthcheck};
  
  const app = fastify({
    logger: {level: 'debug'} as FastifyLoggerOptions,
  });

  app.register(helmet);
  app.register(cors, {
    origin: '*',
  });
  

  app.register(
    //routes registration
    function (_fastify, _, done) {
      //I wszystko z naszej custom tablicy routow rejestrujemy
      app.register(healthcheck);
      done();
    },
    { prefix: '/v1' },
  );

  return app;
};