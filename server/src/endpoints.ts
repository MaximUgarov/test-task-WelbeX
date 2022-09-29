import type { IncomingMessage as Req, ServerResponse as Res } from "http";
import services from "./services";


export const endpoints = [
    {
        path: "items",
        method: "GET",
        service: async (req: Req, res: Res): Promise<void> => {
            const data = await services.getItems()
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(data));
        }
    }
]