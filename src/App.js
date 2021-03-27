import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Deactive from './pages/Deactive';
import Wallet from './pages/Wallet';
import NewRide from './pages/NewRide';
import Notifications from './pages/Notifications';
import DockingPort from './pages/DockingPort';
import BookRide from './pages/BookRide';
import CurrentRide from './pages/CurrentRide';
import RideSummary from './pages/RideSummary';
import BikeTaken from './pages/BikeTaken';
import AddPoints from './pages/AddPoints';
import UserProfile from './pages/UserProfile';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import MastHead from './pages/MastHead';
// import WebPush from './pages/webPush';

function App() {
  console.log("App.js");
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={() => <Home />} />
          <PrivateRoute exact path="/wallet" component={() => <Wallet />} />
          <PrivateRoute exact path="/newride" component={() => <NewRide />} />
          <PrivateRoute exact path="/notifications" component={() => <Notifications />} />
          <PrivateRoute exact path="/dockingports" component={() => <DockingPort />} />
          <PrivateRoute exact path="/bookride/:bikeId" component={() => <BookRide />} />
          <PrivateRoute exact path="/currentride" component={() => <CurrentRide />} />
          <PrivateRoute exact path="/ridesummary/:rideId" component={() => <RideSummary />} />
          <PrivateRoute exact path="/biketaken" component={() => <BikeTaken />} />
          <PrivateRoute exact path="/addpoints" component={() => <AddPoints />} />
          <PrivateRoute exact path="/userprofile" component={() => <UserProfile />} />
          <Route path="/register" component={() => <Register />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/deactive" component={() => <Deactive />} />
          <Route path="/forgetpassword" component={() => <ForgetPassword />} />
          <Route path="/newpassword/:email" component={() => <NewPassword />} />
          <Route path="/masthead" component={() => <MastHead />} />
          {/* <Route path="/webpush" component={() => <WebPush/>} /> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
