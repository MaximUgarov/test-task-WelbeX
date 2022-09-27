import type { IncomingMessage as Request, ServerResponse as Res } from 'http';

type Query = Record<string, string>
type Body = Record<string, any>

export type Req = {
    query: Query,
    body: Body,
    path: Array<string>
} & Request

export type Middleware = (req: Req, res: Res) => [Req, Res] | Promise<[Req, Res]>

export type ResMid = [Req, Res] | Promise<[Req, Res]>

export type Model = {
    [modelName: string]: string;
}

export type Item = {
    id: number;
    date: Date;
    name: string;
    quantity: number;
    distance: number
}