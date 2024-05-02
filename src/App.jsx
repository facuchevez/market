
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import AuthProvider from './Context/AuthContext';
import Public from './Routes/Public';

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <Header/>
            <Public/>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;