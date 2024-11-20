import {useParams} from "react-router-dom";
import {bingoData} from "../data";
import {Button, Card, Headline, Text} from "ethos-ui";
import {useEffect, useState} from "react";
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {LocalStorageController} from "../controller/LocalStorageController";
import {RefreshCcw} from "lucide-react"

export type BingoItem = { item: string, checked: boolean }

// const bingoItemWidths = {
//     3: "28%",
//     4: "24.2%",
//     5: "19%"
// } as { [key: number]: string }

const getRandomBingoItems = (module: string, count: number): BingoItem[] => {
    // @ts-ignore
    const data = bingoData[module] as { name: string, items: string[] } | undefined
    if (!data) {
        return []
    }

    const items = [...data.items]

    const randomItems = []

    // the items cannot double

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * items.length)
        const item = items[randomIndex]

        randomItems.push({item, checked: false})
        items.splice(randomIndex, 1)
    }

    return randomItems
}

export default function () {

    const {module} = useParams() as { module?: string }

    // @ts-ignore
    const data = bingoData[module] as { name: string, items: string[] } | undefined

    if (!data) {
        return <div>
            <Headline variant="h1">Modul nicht gefunden</Headline>
            <Text>
                Das Modul konnte nicht gefunden werden. Bitte überprüfe die den Modulnamen.
            </Text>
        </div>
    }

    const [gameSize] = useState<3 | 4 | 5>(3)
    const [items, setItems] = useState<BingoItem[]>([])


    useEffect(() => {
        const controller = new LocalStorageController()
        const loadedItems = controller.getBingoItems(module!)
        const _items = loadedItems.length > 0 ? loadedItems : getRandomBingoItems(module!, gameSize * gameSize)
        setItems(_items)

        const bingos = getBingos(_items, gameSize)

        try {
            const newBingos = bingos.filter(row => row.every(item => item.checked))

            setPreviousBingos(newBingos)
        } catch (e) {
            // ignore
        }

        controller.saveBingoItems(module!, _items)
    }, []);

    // rows, columns, diagonals that are checked and have a bingo
    const [previousBingos, setPreviousBingos] = useState<BingoItem[][]>([])

    const newField = () => {
        const randomItems = getRandomBingoItems(module!, gameSize * gameSize)
        setItems(randomItems)
        setPreviousBingos([])
        const controller = new LocalStorageController()
        controller.saveBingoItems(module!, randomItems)
    }

    const toggleItem = (index: number) => {
        const newItems = [...items]
        newItems[index].checked = !newItems[index].checked
        setItems(newItems)
        checkBingo(newItems)
        const controller = new LocalStorageController()
        controller.saveBingoItems(module!, newItems)
    }

    const getBingos = (currentItems: BingoItem[], gameSize: number): BingoItem[][] => {
        try {
            const bingos: BingoItem[][] = [];

            // Hilfsfunktion, um die Position (x, y) in das Array-Index umzuwandeln
            const getIndex = (x: number, y: number): number => y * gameSize + x;

            // Zeilen sammeln
            for (let y = 0; y < gameSize; y++) {
                const row: BingoItem[] = [];
                for (let x = 0; x < gameSize; x++) {
                    row.push(currentItems[getIndex(x, y)]);
                }
                bingos.push(row);
            }

            // Spalten sammeln
            for (let x = 0; x < gameSize; x++) {
                const col: BingoItem[] = [];
                for (let y = 0; y < gameSize; y++) {
                    col.push(currentItems[getIndex(x, y)]);
                }
                bingos.push(col);
            }

            // Diagonale (von oben links nach unten rechts) sammeln
            const diagonal1: BingoItem[] = [];
            for (let i = 0; i < gameSize; i++) {
                diagonal1.push(currentItems[getIndex(i, i)]);
            }
            bingos.push(diagonal1);

            // Diagonale (von oben rechts nach unten links) sammeln
            const diagonal2: BingoItem[] = [];
            for (let i = 0; i < gameSize; i++) {
                diagonal2.push(currentItems[getIndex(gameSize - 1 - i, i)]);
            }
            bingos.push(diagonal2);

            return bingos;
        } catch (e) {
            console.error(e)
            return []
        }
    }


    const checkBingo = (currentItems: BingoItem[]) => {

        const bingos = getBingos(currentItems, gameSize)

        const newBingos = bingos.filter(row => row.every(item => item.checked))

        if (newBingos.length > previousBingos.length) {
            bingoEffect()
        }

        setPreviousBingos(newBingos)
    }


    const bingoEffect = () => {
        let i = 0;

        new Audio("/bingo2.mp3").play()

        setTimeout(() => {
            (new Audio("/bingo.mp3")).play()

        }, 1000);

        const interval = setInterval(() => {

            confetti({
                particleCount: 100,
                spread: 70,
                origin: {y: 0.6}
            });
            i++;
            if (i > 10) {
                clearInterval(interval)
            }
        }, 250);
    }

    const isInBingoRow = (index: number) => {
        return previousBingos.some(bingo => bingo.every((item, i) => item.checked && i === index % gameSize))
    }


    return <div>
        <div className="mt-6 mb-10 md:mx-auto w-full max-w-[800px] text-center">
            <Card className="mt-5" variant="secondary">
                <div className="grid md:flex items-center md:justify-between">
                    <Headline variant="h1">{data.name}</Headline>
                    <Button className="mt-4 md:mt-1" variant="secondary" onClick={newField}>
                        <RefreshCcw size={24} className="mr-4"/>
                        Neues Feld
                    </Button>

                </div>

                {/*Create a table with 3 columns and n rows with data.items using tableItems*/}

                <div className="flex flex-wrap gap-2 mt-14 mb-14 w-full md:w-fit justify-center">
                    {items.map((item, index) => {
                        const isChecked = item.checked
                        return <span key={index}
                                     onClick={() => toggleItem(index)}

                                     className={`w-24 md:w-52 text-center btn-animation select-none cursor-pointer rounded-lg p-4 flex items-center justify-center aspect-square border border-gray-200 ${isInBingoRow(index) ? "border-red-400" : ""}  ${isChecked ? "bg-green-300" : ""}`}>
                            <span className="text-xs md:text-md">
                                {item.item}
                            </span>
                                        </span>
                    })}
                </div>


            </Card>
        </div>
    </div>

}