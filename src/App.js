import "./App.css";
import "./assets/css/all.min.css";
import "./assets/css/fontawesome.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import JitsiComponent from "./jitsi/jitsi.component";
import ThankYouComponent from "./thank-you/thank-you.component";
import Main from "./Main";
import { random } from "./jitsi/jitsi.component";
import url from "./Url";

function App() {
    return (
        <>
            <Routes>
                <Route path={url.baseurl} element={<Main />}>
                    <Route
                        path={url.baseurl}
                        element={
                            <Navigate
                                to={`${url.baseurl}/${random}`}
                                from={url.baseurl}
                            />
                        }
                    />

                    <Route
                        exact
                        path={`${url.baseurl}/${random}`}
                        element={<JitsiComponent />}
                    />
                    <Route
                        path={url.thankyou}
                        element={<ThankYouComponent />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
