import {Button, Navbar} from "ethos-ui"
import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Modules from "./pages/Modules";
import BingoPage from "./pages/BingoPage";
import FAQPage from "./pages/FAQPage";

function App() {
    const location = useLocation()

    return (
        <div>
            {location.pathname !== "/" && <Navbar
                variant="secondary"
                title="KIT Vorlesungsbingo (ETIT)"
                onNavigateHome={() => window.location.href = "/"}
                icon={<img src="/icon.png" alt="Icon"/>}
            >

                <div className="ml-auto  items-center">
                    <Button variant="text" onClick={() => window.location.href = "/faq"}>FAQ</Button>
                </div>
            </Navbar>}


            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/modules" element={<Modules/>}/>
                <Route path="/faq" element={<FAQPage/>}/>
                <Route path="/bingo/:module" element={<BingoPage />} />
            </Routes>

        </div>
    )
}

export default App
