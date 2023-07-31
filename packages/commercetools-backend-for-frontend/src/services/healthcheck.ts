 import { FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify';
 
 export interface healthcheckServiceOptions {
   message: string;
 }
 
 const healthcheck: FastifyPluginAsync<Record<string, never>> = async (fastify) => {
   fastify.route({
     url: '/',
     method: 'GET',
     handler: (request: FastifyRequest, response: FastifyReply) => {
       request.log.debug(request);
 
       response.code(200).send('OK');
     },
   });
 
   fastify.route({
     url: '/example',
     method: 'POST',
     schema: {
       body: {
         type: 'object',
         required: ['customer_id'],
         properties: {
           customer_id: { type: 'string' },
         },
       },
     },
     handler: function (request: FastifyRequest, response: FastifyReply) {
       response.code(200).send(request.body);
     },
   });
 };
 
 export default healthcheck;
 