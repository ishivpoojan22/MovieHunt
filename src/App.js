import { Provider } from "react-redux";
import Body from "./Components/Body";
import appStore from "./utils/appStore";


console.log( appStore.getState());

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
