import {BingoItem} from "../pages/BingoPage";


type LocalStorageBingoItem = {
    items: BingoItem[],
    date: number,
    module: string
}

export class LocalStorageController {

    items: LocalStorageBingoItem[] = []

    constructor() {
        this.items = this.load()
    }


    load() {
        return JSON.parse(localStorage.getItem("bingoItems") || "[]")
    }

    save() {
        localStorage.setItem("bingoItems", JSON.stringify(this.items))
    }

    saveBingoItems(module: string, items: BingoItem[]) {
        // update the localStorage items; if the item a item in that module for the same day exists, update it
        const existingItem = this.items.find(item => item.module === module && new Date(item.date).getDay() === new Date(Date.now()).getDay())
        if (existingItem) {
            existingItem.items = items
        } else {
            this.items.push({
                items,
                date: Date.now(),
                module
            })
        }

        this.save()
    }

    getBingoItems(module: string): BingoItem[] {
        return this.items.find(item => item.module === module && new Date(item.date).getDay() === new Date(Date.now()).getDay())?.items || []
    }

}