import './App.css';
import Nav from './components/Nav';
import { ColorModeScript } from '@chakra-ui/react'
import DataTabs from './components/DataTabs';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';

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
        <Nav setData={setNews}/>
        <DataTabs data={news}/>
      </div>
  );
}

export default App;
