import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { mainRouter } from './routes/main';
import helmet from 'helmet';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

server.use(mainRouter);

const port = process.env.PORT || 4000;

server.listen(3000, "10.42.20.89", () => {
    console.log("http://10.42.20.89:3000");
  });
  