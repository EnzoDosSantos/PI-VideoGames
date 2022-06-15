import { Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import DetailGame from "./components/games/detailGame/DetailGame";
import Games from "./components/games/Games";
import CreateGameForm from "./components/form/CreateGameForm";
import RoutesError from "./components/error/RoutesError";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/create">
        <CreateGameForm/>
      </Route>
      <Route exact path="/home">
        <Games/>
      </Route>
      <Route exact path="/game/:id">
        <DetailGame/>
      </Route>
      <Route path="*">
      <RoutesError/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;