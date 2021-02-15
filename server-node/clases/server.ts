import express from 'express';
export default class Server {
    // para que la siguiente linea pueda permitir ese tipo de dato, debimosimportar express, e instalar npm i --save-dev @types/express
    public app: express.Application;
    public port: number = 3000;

    constructor() {
        this.app = express();
    }

    start(callback: Function) {

        this.app.listen(this.port, callback())
    }
}