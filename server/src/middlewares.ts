import type { ServerResponse as Res } from "http";
import type { Body, Req } from "./type";
import { parse } from "url";

export function addCORS(req: Req, res: Res): [Req, Res] {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Max-Age", 2000000)
    return [req, res]
}

export function urlParser(req: Req, res: Res): [Req, Res] {
    const { pathname, query } = parse(req.url ?? "")
    if (query) {
        req.query = query.split("&").reduce(
            (acc: object, element: string): object => {
                const [key, value]: Array<string> = element.split("=")
                return Object.assign(acc, { [key]: value })
            }, {});
    }
    req.path = pathname && pathname.match(/[a-z.]+/g) || ["/"]
    return [req, res]
}

export async function bodyParser(req: Req, res: Res): Promise<[Req, Res]> {
    const data: Array<Uint8Array> = []
    for await (const part of req)
        data.push(part as Uint8Array)
    req.body = JSON.parse(Buffer.concat(data).toString() || "{}") as Body
    return [req, res]
}