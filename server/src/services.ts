import Repository from "./repository";
import { Item } from "./type";

class Services {

    async getItems(): Promise<Array<Item>> {
        const repository = new Repository("item")
        return repository.findAll()
    }

}

export default new Services();