import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";





export default function GameDetail (){
    const [videoGames, setVideogames] = useState(null)
        let id = useParams()
        let ids = id.id;
        console.log(videoGames)
       
    useEffect(() => {
            axios.get('http://localhost:3001/videogame/' + ids)
            .then((response) => {
                setVideogames(response.data)
            })
            return () => {
                setVideogames(null)
            }
    }, [])

//[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
//[ ] Descripción
//[ ] Fecha de lanzamiento
//[ ] Rating
//[ ] Plataformas
    

        
return <div>
<div>
            <div>
                <Link to='/home'>
                <button>Go Back</button>
                </Link>
            </div>
        <div>

    {
        
        videoGames ? 
        <> 
        <h5>{videoGames?.name}</h5>
        <img src={videoGames?.image} alt='image' width="200px" height="250px"/>
        <p>Description: {videoGames?.description?.replace(/<[^>]*>?/g, "")}</p>
        <p>Genres: {videoGames.genres.map(el => el.name).join(", ")}</p>
        <p>Platform: {videoGames?.platforms.join(", ")}</p>
        <p>Released: {videoGames?.released || "not found"} </p>
        <p>Rating: {videoGames?.rating}</p>
        
        
        </> :
        <div>Loading...</div>
        
    }
        </div>
    


</div>

</div>
}; 