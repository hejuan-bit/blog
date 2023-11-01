import "reflect-metadata";
import {Connection, getConnection, createConnection } from 'typeorm';

let ConnectionReadyPromise: Promise<Connection> | null = null;


export const prepareConnection = () => {
    if(!ConnectionReadyPromise){
        ConnectionReadyPromise = (async () => {
            try{
                const stlaConnection = getConnection();
                await stlaConnection.close();
            } catch (error) {
                console.log(error)
            }
            const connectioon = await createConnection({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: {},
                synchronize: false,
                logging: true
            })
            return connectioon
        }

        )()
    }
    return ConnectionReadyPromise
}