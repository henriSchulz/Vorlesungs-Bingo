import {useParams} from "react-router-dom";
import {bingoData} from "../data";
import {Card, Headline, Text} from "ethos-ui";
import {useState} from "react";


const bingoItemWidths = {
    3: "32.5%",
    4: "24.2%",
    5: "19%"
} as { [key: number]: string }

const getRandomBingoItems = (module: string, count: number): { item: string, checked: boolean }[] => {
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
    const [items, setItems] = useState(getRandomBingoItems(module!, gameSize ** 2))


    const toggleItem = (index: number) => {
        const newItems = [...items]
        newItems[index].checked = !newItems[index].checked
        setItems(newItems)
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