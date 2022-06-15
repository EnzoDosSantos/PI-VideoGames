import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { clearCache, getGamesByName } from "../../redux/actions";
import styles from './SearchBar.module.css'



const SearchBar = () => {
    const [value, setValue] = useState("")
    const dispacth = useDispatch()


    const handlleClick = (e) => {
        e.preventDefault()
        dispacth(clearCache())
        dispacth(getGamesByName(value))
        setValue("")
    }

    return (
            <div>
                <input
                    className={styles.searchbar}
                    type="text"
                    placeholder="Search game..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}>
                </input>
                    <button
                     className={styles.searchBtn}
                     type="submit"
                     disabled={value.length === 0}
                     onClick={(e) => handlleClick(e)}>
                         Search
                    </button>
            </div>
    )
}

export default SearchBar