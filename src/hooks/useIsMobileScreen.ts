import {useEffect, useState} from "react";

export default function () {
    const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 1024)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return isMobileScreen
}

