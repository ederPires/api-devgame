import { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { PubSubEngine } from 'graphql-subscriptions';

export interface MyContext {
  req: Request;
  res: Response;
  payload?: any; // Para dados de autenticação JWT
  wsServer: WebSocketServer; // Para gerenciar conexões WebSocket
  clients: Set<WebSocket>; // Conjunto de clientes WebSocket conectados
  pubSub: PubSubEngine; // Para publicação de eventos de subscription GraphQ
}
