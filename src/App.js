import './App.css';
import "semantic-ui-css/semantic.min.css";
import { Fragment } from 'react';
import { NavBar } from './components/NavBar';
import { Container, Grid } from 'semantic-ui-react';
import { ChartMenu } from './components/ChartMenu';
import { Dashboard } from './components/Dashboard';
import { Dashboard2 } from './components/Dashboard2';
import { Route, Switch } from 'react-router';
import { ReportingLayout } from './components/ReportingLayout';

function App() {
  return (
    <div className="App" style={{ backgroundColor: "ivory", height: "100vh", width: "100%" }}>
        <Fragment >
          <NavBar />
          <Container style={{ marginTop: "7em" }} fluid>
          <Switch>
              <Route path='/Dashboard1' component={ReportingLayout}/>
              <Route path='/Dashboard2' component={Dashboard2}/>
            </Switch>
          </Container>
        </Fragment>
    </div>
  );
}

export default App;
