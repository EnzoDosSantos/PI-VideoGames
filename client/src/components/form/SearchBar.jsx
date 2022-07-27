import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { clearCache, getGamesByName } from "../../redux/actions";
import styles from './SearchBar.module.css'



const SearchBar = () => {
    const [value, setValue] = useState("")
    const dispacth = useDispatch()


    const handlleClick = (e) => {
        e.preventDefault()
        if(value.length === 0){
            return
        }
        dispacth(clearCache())
        dispacth(getGamesByName(value))
        setValue("")
    }

    return (
        <div className={styles.conteiner}>
            <input
                className={styles.input}
                type="text"
                required=""
                placeholder="Search game..."
                value={value}
                onChange={(e) => setValue(e.target.value)}>
            </input>
            <button
                className={styles.Button}
                type="submit"
                onClick={(e) => handlleClick(e)}>Search
                <div className={styles.icon}>
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
            </button>

        </div>
    )
}

export default SearchBar