import { Client } from "pg";
import { databaseConfig } from "../constants";
import { models } from "./models";

const {
    generators,
    types,
} = require('mock-creator');


export const databaseClient = new Client(databaseConfig);

export async function createDb(): Promise<void> {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        password: databaseConfig.password,
        port: databaseConfig.port,
    });

    await client.connect();
    await client.query(`CREATE DATABASE testdb;`)
        .catch(async (err) => {
            if (err.code === "42P04") {
                await client.query(`DROP DATABASE IF EXISTS testdb WITH (FORCE);`);
                await client.end();
                await createDb();
            } else process.exit(0)
        })
}

export async function initDb(force: boolean): Promise<void> {
    await databaseClient.connect();
    if (force) {
        createModels();

    }
}

export function createModels(): void {
    for (const model in models) {
        if (Object.prototype.hasOwnProperty.call(models, model)) {
            const element = models[model];
            const query = `CREATE TABLE ${model} (
                ${element}
            );`;
            databaseClient.query(query).then(() => console.log(`>>>\x1b[0m\t\x1b[33mTable ${model} is successfully created`))
        }
    }
    createMokData()
}

function createMokData() {
    const arrayConfig = {
        length: 50,
        fields: {
            date: {
                type: types.valueTypes.DATE,
                generatorType: types.generatorTypes.RANDOM,
            },
            name: {
                type: types.valueTypes.STRING,
                generatorType: types.generatorTypes.RANDOM,
            },
            quantity: {
                type: types.valueTypes.NUMBER,
                generatorType: types.generatorTypes.RANDOM,
            },
            distance: {
                type: types.valueTypes.NUMBER,
                generatorType: types.generatorTypes.RANDOM,
            },
        }
    }

    const results = generators.generateArray(arrayConfig);

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    for (let i = 0; i < results.length; i++) {
        const { date, name, quantity, distance } = results[i];
        databaseClient.query(`
        INSERT INTO item (id, date, name, quantity, distance)
        VALUES (${getRandomInt(23232)}, '${date.toISOString().split`T`[0]}', '${name}', ${quantity}, ${distance})
        `)
    }
}