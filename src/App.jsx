import { BrowserRouter as Router } from 'react-router-dom';
import CustomLayout from './layout';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <CustomLayout>
        <AppRoutes />
      </CustomLayout>
    </Router>
  );
}

export default App;
