
import './App.css';
import Navbar from "./Components/Navbar";
import BookList from "./Components/BookList";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
function App() {

  const [books,setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
   useEffect(()=>{
    const handleSearch = async (query) => {
       
       
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );
  
        const searchResult = response.data.items;
        
        setBooks(searchResult);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(searchQuery,"show")
    handleSearch({searchQuery})
  },[searchQuery])
  

  useEffect(()=>{
    
    const DataFetch = async ()=>{

      try{
        const herryPotterBooks = await axios.get("https://www.googleapis.com/books/v1/volumes?q=harry+potter");
        const sharelockBooks = await axios.get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"); 
        const AllData = herryPotterBooks.data.items.concat(sharelockBooks.data.items)
        setBooks(()=>AllData);
      }
      catch(error){console.log(error)}
    }
    DataFetch()
  },[]);
  return (
    <div className="App">
       
      <Navbar onSearch={setSearchQuery}/>
      { books.length>0 && <BookList books={books}/> }
    </div>
  );
}

export default App;
