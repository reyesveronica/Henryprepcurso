import React from "react"
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {fetchVideoGame , getGenres, filterGenre, filterGameAPIorDB, filterSort, filterSortRating, filterPlat} from '../../store/actions/index'
import  Card from '../card/card'
import Paginado from "../paginado/paginado"
import SearchBar from "../search/searchBar"
import {ASCENDENTE,DESCENDENTE,RATINGMAS,RATINGMENOS } from "../../const"



//  -------     IMAGE NOT FOUND -----------
//https://m.media-amazon.com/images/I/71FRuuxuaUL._SS500_.jpg

export default function Home(){
    
  // --------------------traigo generos para options ---------------   
    const genres = useSelector((state) => state.genreGame)
    useEffect (() => {
    dispatch(getGenres() );
    // eslint-disable-next-line no-use-before-define
    },[getGenres])

    //--------------traigo mi estado a renderizar---------------------------------
    const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.filterVideoGames)
  
 
  //------paginado.....
  const [currentPage,setCurrentPage] = useState(1)
  const [gamesPerPage,setGamesPerPage] = useState(15)
  const indexOfLastGame = currentPage * gamesPerPage 
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGame = allVideogames.slice(indexOfFirstGame,indexOfLastGame)
  

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
  
 //---------------FUNCIONES-------------------

    function handleClick(e){
        e.preventDefault()
        dispatch(fetchVideoGame())

    }
    function handleFilterByGenre(e){
        
        dispatch(filterGenre(e.target.value))

        }
    function handleFilterPlatforms(e){
        dispatch(filterPlat(e.target.value))
    }
    function handleFilter(e){
            dispatch(filterGameAPIorDB(e.target.value))
        }
  
    function handleFilterSort(e){
        dispatch(filterSort(e.target.value))
    }    
    function handleFilterSortRating(e){
        dispatch(filterSortRating(e.target.value))
    }
    // renderizo
    
    return <div>
          <div>
     <Link to="/">
         <button>Home</button>
     </Link>
     <h1>SEARCH YOUR GAME</h1>
    
     <Link to="/videogame">
         <button>Create your game</button>
     </Link>
       
     </div>
    
     <div>
         <div>
         <SearchBar />
         </div>
         <label> A-Z | Z-A :
         <select onChange={e => handleFilterSort(e)}>
             <option >Select</option>
             <option value ={ASCENDENTE}>A-Z</option>
             <option value={DESCENDENTE}>Z-A</option>
         </select>
         </label>
         <label>Rating :
         <select onChange={e => handleFilterSortRating(e)}>
             <option>Select</option>
             <option value ={RATINGMAS}>Rating +</option>
             <option value={RATINGMENOS}>Rating -</option>
         </select>
         </label>
         <label>Platforms:
             <select onChange={e => handleFilterPlatforms(e)}>
                 <option value="PlayStation 4">PlayStation4</option>
                 <option value="PlayStation 5">PlayStation5</option>
                 </select>
             </label>
         <label> Genres :
         <select onChange={e => handleFilterByGenre(e)}>
                    <option value="all">All</option>
        {
            genres?.map((el =>{
                return(
                    <option key={el.name} value={el.name}>{el.name}</option>
                )
            }))
        }

        </select>
        </label>
        <label> Game DB or API :
         <select onChange={e => handleFilter(e)}>
             <option value='all'>All</option>
             <option value='created'>Created</option>
             <option value='api'>Api</option>
         </select>
         </label>
         <button onClick={e => {handleClick(e)}}>Reload VideoGames</button>
             <Paginado 
             gamesPerPage={gamesPerPage}
             allVideogames = {allVideogames.length}
             paginado = {paginado}
             />
         
         <div>
         <div>
           
         { 
            
            
             allVideogames.length > 0 ?
             
             currentGame?.map(el => {
                 
                 return(

               <Card id={el.id} key={el.id} name={el.name} image={el.background_image} genre={el.genres} /> 
               )
               
           }) : 
           
           <div>
               Game Not Found
           </div> 

          
           
        
         }
         </div>
         </div>
         <div>
         <Paginado 
         gamesPerPage={gamesPerPage}
         allVideogames = {allVideogames.length}
         paginado = {paginado}
         />
         </div>
     </div>
    </div>

    }   