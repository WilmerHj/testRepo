import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import ItemList from "./components/ItemList";

function App() {

  return (
    <div className="App">
      <AppNavbar title="MATKOLLEN"/>
      <div style={{
        position:"relative",
        zIndex:"10",
        marginBottom:"10px",
        backgroundColor:"white",
        minHeight:"100vh"
      }}>
        <ItemList />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
