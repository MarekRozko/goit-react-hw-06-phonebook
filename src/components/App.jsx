import Phonebook from "./Phonebook/Phonebook";
import { Provider } from "react-redux";
import { store, persistor} from "../redux/store"
import { PersistGate } from 'redux-persist/integration/react';



export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Phonebook />
        </PersistGate>
      </Provider>
    </div>
  );
};


export default App;