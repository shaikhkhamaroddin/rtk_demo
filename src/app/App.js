import '../styles/App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/redux';  // Store
import {incr,decr,reset,fetchUsers}  from '../redux/redux';  // Actions

function Home() {
  const dispatch = useDispatch();
  const {count,loading,isError,data} = useSelector(state=>state.counter);
  return (
    <div className="App">
    <p>count : {count}</p>
    <p>Loading : {loading?'....':'False'}</p>
    <p>isError : {isError?'Error fetching data':'False'}</p>
    <button onClick={()=>dispatch(incr())}>Increament</button>
    <button onClick={()=>dispatch(decr())}>Decreament</button>
    <button onClick={()=>dispatch(fetchUsers())}>FetchData</button>
    <button onClick={()=>dispatch(reset())}>Clear</button>

    { data?
      data.map((item,index)=><div key={index}>{item?.login}</div>)
      :null
    }
    </div>
    
  );
}

const App=()=>{
  return(<>
  <Provider store={store}>
  <Home/>
  </Provider>
  </>)
}


export default App;
