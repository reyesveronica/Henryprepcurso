import React from 'react';
import { Link } from 'react-router-dom';
import  './card.css';




export default function Card ({name, image, genre, id}) {
   
    const filterGenre = genre
   
    return (
        <div className="cardComp">
        <Link to={`/${id}`}>
            
            <img src={image} alt='imagen'  />
            <h3 >{name}</h3>
            
            
            
            
            {
                filterGenre.map((el => {
                    return <p key={el.name}>{el?.name || el}</p>
                }))
            }
          
        </Link>
    </div>
    )
        }
            