import { useState, useEffect } from "react";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ListContext } from "./store/context";
import { fetchDataCall } from "./config/handleApi";

function App() {
  const [data, setData] = useState([]);
  const [currSelect, setCurrSelect] = useState({
    _id: 0,
    done: false,
    note: "",
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataCall();
      const list = response?.data ?? [];
      setData(list);
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <ListContext.Provider
        value={{
          data,
          setData,
          currSelect,
          setCurrSelect,
        }}
      >
        <AppRouter />
      </ListContext.Provider>
    </Provider>
  );
}

export default App;
