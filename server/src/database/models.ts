import type { Model } from "../type";

export const models = {
    item: `id int NOT NULL PRIMARY KEY,
    date date,
    name varchar,
    quantity int,
    distance int`
} as Model