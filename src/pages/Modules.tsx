import {Card, Headline, ImageCard, Text} from "ethos-ui";
import {useNavigate} from "react-router-dom";
import useIsMobileScreen from "../hooks/useIsMobileScreen";


export default function () {
    const navigate = useNavigate()
    const isMobile = useIsMobileScreen()

    return <div>

        <div className="mt-6 mb-10 md:mx-auto w-full max-w-[800px]">
            <Card className="mt-5" variant="secondary">
                <Headline variant="h1">Modulauswahl</Headline>
                <Text>
                    Wähle das Modul aus, in dem du Bingo spielen möchtest:
                </Text>

                <div className="flex flex-wrap gap-2 mt-5">

                    <ImageCard
                        onClick={() => navigate("/bingo/DT")}
                        image="digitaltechnik.jpg" width={isMobile ? 320: 370} title={"Digitaltechnik"}/>
                    <ImageCard
                        onClick={() => navigate("/bingo/LEN")}

                        image="len.jpeg" width={isMobile ? 320: 370} title={"Lineare Elektrische Netze"}/>
                    <ImageCard
                        onClick={() => navigate("/bingo/HM1")}
                        image="hm1.jpg" width={isMobile ? 320: 370} title={"Höhere Mathematik I"}/>
                    <ImageCard
                        onClick={() => navigate("/bingo/EXPHA")}
                        image="ex-ph.jpeg" width={isMobile ? 320: 370} title={"Experimentalphysik A"}/>

                </div>

            </Card>
        </div>

    </div>

}