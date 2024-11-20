import {useParams} from "react-router-dom";
import {bingoData} from "../data";
import {Card, Headline, Text} from "ethos-ui";
import {useEffect, useState} from "react";
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {LocalStorageController} from "../controller/LocalStorageController";

export type BingoItem = { item: string, checked: boolean }

const bingoItemWidths = {
    3: "32.5%",
    4: "24.2%",
    5: "19%"
} as { [key: number]: string }

const getRandomBingoItems = (module: string, count: number): BingoItem[] => {
    // @ts-ignore
    const data = bingoData[module] as { name: string, items: string[] } | undefined
    if (!data) {
        return []
    }

    const items = data.items

    const randomItems = []

    // the items cannot double

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * items.length)
        randomItems.push({item: items[randomIndex], checked: false})
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
        setItems(loadedItems.length > 0 ? loadedItems : getRandomBingoItems(module!, gameSize * gameSize))
    }, []);

    // rows, columns, diagonals that are checked and have a bingo
    const [previousBingos, setPreviousBingos] = useState<BingoItem[][]>([])


    const toggleItem = (index: number) => {
        const newItems = [...items]
        newItems[index].checked = !newItems[index].checked
        setItems(newItems)
        checkBingo(newItems)
        const controller = new LocalStorageController()
        controller.saveBingoItems(module!, newItems)
    }


    const checkBingo = (currentItems: BingoItem[]) => {

        const gridSize = Math.sqrt(currentItems.length);
        // if (!Number.isInteger(gridSize)) {
        //     throw new Error("Die Anzahl der Items muss ein perfektes Quadrat sein.");
        // }

        const bingo: BingoItem[][] = []; // Array für alle Bingo-Möglichkeiten

        // Speichere Zeilen in bingo
        for (let row = 0; row < gridSize; row++) {
            const rowItems = currentItems.slice(row * gridSize, row * gridSize + gridSize);
            bingo.push(rowItems);
        }

        // Speichere Spalten in bingo
        for (let col = 0; col < gridSize; col++) {
            const columnItems = currentItems.filter((_, index) => index % gridSize === col);
            bingo.push(columnItems);
        }

        // Speichere Hauptdiagonale in bingo
        const mainDiagonal = currentItems.filter((_, index) => index % (gridSize + 1) === 0);
        bingo.push(mainDiagonal);

        // Speichere Gegendiagonale in bingo
        const antiDiagonal = currentItems.filter(
            (_, index) => index % (gridSize - 1) === 0 && index !== 0 && index !== currentItems.length - 1
        );
        bingo.push(antiDiagonal);

        // Prüfe, ob eine der Bingo-Möglichkeiten erfüllt ist
        const hasBingo = bingo.some(line => line.every(item => item.checked));

        if (hasBingo) {
            setPreviousBingos(bingo);
            if (previousBingos.length === 0) {
                bingoEffect();
            }
        }
    }

    const bingoEffect = () => {
        let i = 0;
        const interval = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {y: 0.6}
            });
            i++;
            if (i > 7) {
                clearInterval(interval)
            }
        }, 250);
    }


    return <div>
        <div className="mt-6 mb-10 md:mx-auto w-full max-w-[800px]">
            <Card className="mt-5" variant="secondary">
                <Headline variant="h1">{data.name}</Headline>

                {/*Create a table with 3 columns and n rows with data.items using tableItems*/}

                <div className="flex flex-wrap gap-2 mt-6">
                    {items.map((item, index) => {
                        const isChecked = item.checked
                        return <span key={index} style={{width: bingoItemWidths[gameSize]}}
                                     onClick={() => toggleItem(index)}
                                     className={`text-center btn-animation select-none cursor-pointer rounded-lg p-4 flex items-center justify-center aspect-square border border-gray-200 ${isChecked ? "bg-green-300" : ""}`}>
                            {item.item}
                                        </span>
                    })}
                </div>


            </Card>
        </div>
    </div>

}