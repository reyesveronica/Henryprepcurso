
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchVideoGame, getGenres, postVideoGame } from '../../store/actions';



export default function GameCreate (){
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genreGame)
    

    const [input, setInput] = useState({
        name: "",
        description:"",
        platforms:[],
        background_image:"",
        released:"",
        rating:"",
        genres:[]

    }) // controlar plataformas y generos!!! 
    const [errors, setErrors] = useState({})

    useEffect (() => {
        dispatch(getGenres())
    },[])
    function handleDelete(el){
        setInput({
            ...input,
            genres: input.genres.filter( occ => occ !== el)
        })
    }
    function handleDeletePlat(el){
        setInput({
            ...input,
            platforms: input.platforms.filter( occ => occ !== el)
        })
    }

        function validate (input){
            let errors = {};
          if(!input.name) {
              errors.name = "  Require Name"
          }
          else if (!input.description){
              errors.description = "Require Description"
          }
          else if(input.rating < 0 || input.rating > 5)
          errors.rating = "  Rating from 0 to 5 "
          else if (!input.platforms){
            errors.platforms = "  Require at least one platform"
        }
        else if (!input.genres){
            errors.genres = "  Require at least one genre"
        }

          return errors
            
        }

        function  handleChange(e){
            setInput({
                ...input,
                [e.target.name]: e.target.value

            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

        }
        function handleSelection(e){
            setInput({
                ...input,
                genres : [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        
        }
        function handleSelectionP(e){
            setInput({
                
                ...input,
                platforms : [...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

        }
     

        function handleSubmit(e){
            e.preventDefault()
         
            
            dispatch(postVideoGame(input))
            

            alert("Videogame created")
            setInput({
                name: "",
                description:"",
                platforms:[],
                background_image:"",
                released:"",
                rating:"",
                genres:[]
                    })
        dispatch(fetchVideoGame())
                   
        
    }
        
    return(
        <div>
            <div className='cardContainer'>
            <Link to="/home"><button>Go Back</button></Link>
            <form  onSubmit={(e)=>handleSubmit(e)} >
            <h1>Create your Video Game</h1>
                <div>
                    <label>Name:</label>
                        <input 
                        type="text" 
                        value={input.name}
                        name="name"
                        onChange={(e)=>handleChange(e)}
                        required
                        
                        />{errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Description:</label>
                        <textarea
                        row="10"
                        cols="50" 
                        type="textarea" 
                        value={input.description}
                        name="description" 
                        onChange={(e)=>handleChange(e)}
                        
                        required
                        />
                        {errors.description && (
                            <p>{errors.description}</p>
                        )}
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    type="text"
                    value={input.background_image}
                    name="background_image" 
                    onChange={(e)=>handleChange(e)}
                    required
                    
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                    type="number"
                    value={input.rating}
                    name="rating"
                    step={0.1} 
                    min={0.1}
                    max={5}
                    onChange={(e)=>handleChange(e)}
                    
                    required
                    />  {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Released</label>
                    <input
                    type="date"
                    name="released"
                    onChange={(e)=>handleChange(e)}
                    required
                    
                    />
                </div>
                <div>
                <div>
                    <label>Platforms:
                        <select multiple onChange={(e) => handleSelectionP(e)} required>
                            <option value="PS5">PS5</option>
                            <option value="PS4">PS4</option>
                            <option value="PS3">PS3</option>
                            <option value="Xbox S/X">Xbox S/X</option>
                            <option value="Xbox One">Xbox One</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Wii">WII</option>
                        </select>
                    </label>
                    
                </div>
                <div>
                    <label>Genres:
                    <select multiple onChange={(e)=>handleSelection(e)} required>
                        {
                           genres?.map((el =>{
                            return(
                                <option value={el.name}>{el.name}</option>
                            )
                            }))
                        }
                    </select>
                    </label>
                </div>
                </div>
                <button type="submit">Create</button>
                
            <div>
                <div>
                <h4>platforms selected:</h4>
            {
                input.platforms.map(el =>
                    <div className="content">
                        <p>{el}</p>
                        <button className="btnCreate" onClick={(e)=> handleDeletePlat(el)}>X</button>
                        </div>)
            }
            </div>
            <div>
                <h4>Genres selected:</h4>
            {
            input.genres.map(el => 
                <div>
                    <p>{el}</p>
                    <button onClick={(e)=> handleDelete(el)} id="but123">x</button>
                </div>)
            }
            </div>
                </div>
                
            </form>
        </div>
        
        </div>
            
        



)   
    }
    
          /*  
        <div className={styles.previ}>
                <div className={styles.previsualizacion}></div>
                    <div className={styles.nameprev}>{input.name}</div>
                    <div className={styles.descriptionprev}>
                        <p className={styles.pr}>Description:   {input?.description}</p>
                       
                        <img src={input?.background_image}  className={styles.imagess}/>
                        <p className={styles.ratingprev}>rating:  {input?.rating}</p>
                        </div>
            </div>
            */