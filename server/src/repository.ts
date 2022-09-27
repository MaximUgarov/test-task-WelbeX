import { databaseClient } from "./database"

class Repository {
    private modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async findAll() {
        return databaseClient.query(`SELECT * FROM ${this.modelName};`).then(({ rows }) => rows);
    }

}

export default Repository