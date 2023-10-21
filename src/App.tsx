import { Provider } from "react-redux";
import LoginPage from "./pages/loginPage";
import store from "./store";


const App = () => (
  <Provider store={store}>
    <LoginPage />
  </Provider>
)
  
export default App;
