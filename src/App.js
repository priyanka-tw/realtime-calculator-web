import Provider from "./services/global-context-provider/provider";
import Webpage from "./pages/webpage/webpage";

function App() {
    return (
        <Provider>
            <Webpage/>
        </Provider>
    );
}

export default App;
