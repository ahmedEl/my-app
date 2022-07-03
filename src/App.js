import {Provider} from "react-redux";
import logo from './logo.svg';
import './App.css';
import MyMap from './components/MyMap';
import StoreMultiReducer from "./StoreMultiReducer/StoreMultiReducer";

function App() {
  return (
    <Provider store={StoreMultiReducer}>
    <div className="App">
      <MyMap />
    </div>
    </Provider>
  );
}

export default App;
