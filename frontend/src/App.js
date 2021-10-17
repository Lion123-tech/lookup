import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./theme/theme";
import { lazy, Suspense } from "react";
import ConnectionsPage from "./Components/Connections/ConnectionsPage";
import MainEvent from "./Components/Events2/MainEvent";
import { useEffect } from "react";
import { messaging } from "./firebase";
import ButtonAppBar from "./Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/authSlice";
import { CustomModal } from "./Components/Modal/Modal";
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtherUserCreation from "./Components/OtherUserCreation/OtherUserCreation";
const EventContainer = lazy(() => import("./Components/Events/EventContainer"));
const UserCreationPage = lazy(() =>
  import("./Components/UserCreation/UserCreation")
);

function App() {
  // const darkPref = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(fetchUser());

    // localStorage.setItem("jwt", user.token)
    if (messaging) {
      navigator.serviceWorker.ready.then((registration) => {
        messaging
          .getToken({
            vapidKey:
              "BP9N1B8hkI0aJoMnONgWd4cDrAsinZJ4gzln0r0ZIMqq1yfEEngcylJCZzsJEBZE5moVbOcCYA9WYVakz1hj_NI",
            serviceWorkerRegistration: registration,
          })
          .then((value) => {
            console.log(value);
          });
        // console.log("test");
        // messaging.onMessage((payload) => {
        //   alert(JSON.stringify(payload));
        // });
      });
    }
  }, []);
  return (
    // <ThemeProvider theme={darkPref ? darkTheme : lightTheme}>
    // Removed dark mode
    <ThemeProvider theme={lightTheme}>
      <Router>
        {/*         Loading page is a little buggy, will figure this out later
        Using the standard PWA splash screen for now
 */}
        <Suspense fallback={<></>}>
          <ButtonAppBar />
          <CustomModal />
          <ToastContainer
          transition={Flip}
          autoClose={2000}
          hideProgressBar
          />
          <Switch>
            {/* <Route path="/events">
              <EventContainer />
            </Route> */}
                        <Route path="/events">
              <MainEvent />
              
            </Route>
            
            <Route path="/profile/:id">
              <OtherUserCreation />
            </Route>
            <Route path="/myprofile">
              <UserCreationPage />
            </Route>
            {/* <Route path="/loading">
              <LoadingPage />
            </Route> */}
            <Route exact path="/">
              <Redirect to="/events" />
            </Route>
            <Route path="/connections">
              <ConnectionsPage />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
