import React from 'react';
import Header from "./Header";
import Main from './Main';
//import { withAuthenticator } from '@aws-amplify/ui-react'

class App extends React.Component {
  render() {
    return (
        <div>
            <Header />
            <Main />
        </div>
    );
  }
}

//export default withAuthenticator(App)
export default App;
