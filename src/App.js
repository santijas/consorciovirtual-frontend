import { Routes } from './routes';
import './App.css';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/UseFindUser';

function App() {

  const { user, setUser, isLoading } = useFindUser();


  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Routes/>
    </UserContext.Provider>
  );
}

export default App;
