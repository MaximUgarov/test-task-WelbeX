import { endpoints } from "./endpoints";
import type { Middleware, Req, ResMid } from "./type.d";
import type { ServerResponse as Res } from "http";
import { createServer } from "http";
import { addCORS, urlParser, bodyParser } from "./middlewares";
import { createInterface } from "readline";
import { createDb, initDb } from "./database";
import { appConfig } from "./constants";



const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

const server = createServer();

function compose(...fns: Array<Middleware>) {
    return function (...arg: [Req, Res]) {
        return fns.reduceRight((chain, func) =>
            chain.then((el: [Req, Res]): ResMid => func(...el)), Promise.resolve(arg))
    }
};

async function reqHandler(req: Req, res: Res): Promise<void> {
    const [newReq] = await compose(addCORS, urlParser, bodyParser)(req, res);
    const endpoint = endpoints.find(({ path, method }) => path === newReq.path[0] && method === newReq.method);

    if (endpoint) {
        endpoint.service(newReq, res);
    } else {
        res.statusMessage = "Invalid Uri Resource"
        res.statusCode = 404;
        res.end();
    }
}

function start(): void {
    process.stdout.write("\u001B[2J\u001B[0;0f")
    server.listen(appConfig.port, () =>
        console.log(`\x1b[32m\n>>>\x1b[0m\t\x1b[33mServer was started on \x1b[32mhttp://localhost:${appConfig.port}\x1b[0m`))
}

readLine.question("\x1b[32m\n>>>\x1b[0m\tСreate a new database ?\n\x1b[32m\n>>>\x1b[0m\tY - Yes, N - No ",
    async (result: string): Promise<void> => {
        start()
        if (/^y/i.test(result)) {
            await createDb()
            await initDb(true).then(() => console.log(`\x1b[32m\n>>>\x1b[0m\t\x1b[33m\x1b[32mDatabase connected`))
        } else {
            await initDb(false).then(() => console.log(`\x1b[32m\n>>>\x1b[0m\t\x1b[33m\x1b[32mDatabase connected`))
        }
    })

process.stdin.on("keypress", (_, { name, ctrl }): void => {
    if (ctrl && name === "c") {
        process.stdout.write("\u001B[2J\u001B[0;0f");
        process.exit(1);
    }
})

server.on("request", reqHandler);