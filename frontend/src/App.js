import Nav from './components/Nav';
import { ColorModeScript } from '@chakra-ui/react'
import DataTabs from './components/DataTabs';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import { Routes, Route, useLocation} from 'react-router-dom';
import Admin from './components/Admin';


function groupObjectsByCategory(objects) {
  const result = {};

  objects.forEach((obj) => {
    const { category, ...restData } = obj;

    if (!result[category]) {
      result[category] = [];
    }

    result[category].push(restData);
  });

  return result;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [news, setNews] = useState([]);

  const getNews = async () => {
    try{
        const response = await api.get("/api/v1/news");
        console.log(response.data);
        const newsData = groupObjectsByCategory(response.data);
        setNews(newsData);
        console.log(newsData);
    }
    catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getNews();
  }, []);

  return (
      <div className="App">
        <ColorModeScript initialColorMode={"dark"} />
        <Nav setData={setNews} isDashboard={isDashboard}/>
        <Routes>
          <Route path='/dashboard' element={  <DataTabs data={news}/> }/>
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </div>
  );
}

export default App;
