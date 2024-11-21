import {Card, Headline, Text} from "ethos-ui";


export default function () {

    return <div>
        <div className="mt-6 mb-10 md:mx-auto w-full max-w-[800px]">
            <Card className="mt-5" variant="secondary">
                <Headline variant="h1">
                    Häufig gestellte Fragen
                </Headline>
                <Text>
                    Du hast Fragen zur App? Hier findest du die Antworten.
                </Text>

                <div className="mt-10">
                    <div>
                        <Headline variant="h3">
                            Wie kann ich Bingo spielen?
                        </Headline>

                        <Text>
                            Wähle das Modul aus, in dem du Bingo spielen möchtest. Klicke auf das Modul und schon kann
                            es
                            losgehen.
                        </Text>

                    </div>
                    <div className="mt-5">
                        <Headline variant="h3">
                            Mir fehlt eine Bingo Kategorie. Was kann ich tun?
                        </Headline>

                        <Text>
                            Schlage <a className="hover:underline text-blue-500"
                                       href="https://docs.google.com/forms/d/e/1FAIpQLSf31dVjQf8U-fqKsQoXY4S1ti2fjxZojwzsGGDY3blXaKgxLw/viewform?usp=sf_link">hier</a> eine
                            neue Kategorie vor.
                        </Text>
                    </div>

                    <div className="mt-5">
                        <Headline variant="h3">
                            Was für Bingo Kategorien gibt es sonst noch?
                        </Headline>
                        <Text>
                            Schau dir <a className="hover:underline text-blue-500"
                                         href="https://papers.craft.me/kaBsPfX3IyvbGR">hier</a> die
                            Liste aller Kategorien an, die es im Bingo gibt.
                        </Text>
                    </div>

                    <div className="mt-5">
                        <Headline variant="h3">
                            Wie kann ich dann der App mitarbeiten?
                        </Headline>

                        <Text>
                            Die App ist Open Source und kann auf <a className="hover:underline text-blue-500"
                                                                    href="https://github.com/henriSchulz/Vorlesungs-Bingo">GitHub</a> gefunden
                            werden.
                            Wenn du mithelfen möchtest, kannst du gerne einen Pull Request erstellen.
                        </Text>
                    </div>

                    <div className="mt-5">
                        <Headline variant="h3">
                            Wie kann ich die App verbessern?
                        </Headline>

                        <Text>
                            Wenn du Verbesserungsvorschläge hast, kannst du gerne ein Issue auf GitHub erstellen.
                        </Text>
                    </div>

                    <div className="mt-5">
                        <Headline variant="h3">
                            Ich finde eine Kategorie nicht lustig oder unpassend. Was kann ich tun?
                        </Headline>

                        <Text>
            Priziell sind die Kategorien humoristisch gemeint und sollen die Vorlesung auflockern. Wenn du eine Kategorie nicht lustig findest, kannst du sie einfach ignorieren. Wenn du eine Kategorie unpassend findest, kannst du gerne
                            diese gerne unter <a className="hover:underline text-blue-500" href="https://forms.gle/3eM6UGvXHqsECGRu9">
                                diesem Link
                        </a> melden.
                        </Text>


                    </div>

                </div>

            </Card>
        </div>
    </div>

}