import './App.css';
import Form from './pages/Form';
import UploadCSV from './pages/UploadCSV';
import UserTabel from './pages/UserTabel';

function App() {
  return (
    <div className="App">
   <Form/>
   <UserTabel/>
   <UploadCSV/>
    </div>
  );
}

export default App;
