import {Button, Headline} from "ethos-ui";
import {useNavigate} from "react-router-dom";
import useIsMobileScreen from "../hooks/useIsMobileScreen";

export default function HomePage() {

    // @ts-ignore
    const navigate = useNavigate()
    const isMobile = useIsMobileScreen()

    return <div>


        <div
            className="fixed inset-x-0 bottom-0 w-full rounded-t-3xl border border-gray-100 bg-white p-5 text-center shadow-lg sm:p-8 lg:left-10 lg:bottom-10 lg:max-w-2xl lg:rounded-b-3xl">
            <div className="flex justify-start gap-3 items-center">
                <img height={70} width={70} src="./icon.png"/>
                <Headline className="text-2xl md:text-5xl" variant={"h1"}>KIT Vorlesungsbingo</Headline>
            </div>
            <div className="my-4 mb-6 text-left sm:my-8">
                <Headline variant={isMobile ? "h4": "h2"} className="mb-2 text-black">
                    Bingo für Vorlesungen im 1. Semester ETIT
                </Headline>
                <p className="text-sm text-gray-500 break-words overflow-hidden sm:px-0">
                    Hier kannst du Bingo spielen, während du Vorlesungen hörst. Diese App richtet sich an Stundenten,
                    die mehr Spaß an den Vorlesungen haben wollen.
                </p>
            </div>
            <div className="flex gap-4 w-full md:w-fit">
                <div>
                    <Button onClick={() => navigate("/modules")}
                            className="w-full md:w-fit bg-gray-800 px-10 py-6 text-xl rounded-xl font-bold">
                        Loslegen!
                    </Button>
                </div>

            </div>

        </div>
    </div>
}