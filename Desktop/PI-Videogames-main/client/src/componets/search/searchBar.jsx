import {useState} from 'react';
import { fetchVideoGame, searchVideoGame } from '../../store/actions';
import { useDispatch } from 'react-redux';


export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault();
        if(!search){
            dispatch(fetchVideoGame())
        } else {
        dispatch(searchVideoGame(search))
        
        setSearch("")
    }
}
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search} placeholder="Insert name " />
            <input type="submit" value="Search"/>
        </form>
    </div>
}