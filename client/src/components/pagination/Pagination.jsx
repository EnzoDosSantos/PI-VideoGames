import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import styles from './Pagination.module.css'

function Pagination({ allGames }) {
  const pages = useSelector(state => state.page)
  const dispatch = useDispatch()
  let pageNumbers = []
  const gamePerPage = 15
  let page = Math.ceil(allGames/gamePerPage)


  for(let i = 1 ; i <= page; i++){
    pageNumbers.push(i)
  }
 
  return (
    <div className={styles.conteiner}>
    <nav>
      <ul>

          <button className={styles.button2} disabled={pages - 1 === 0} onClick={() => dispatch(setCurrentPage(pages - 1))} >Prev</button>

      { 
        pageNumbers?.map(e => (
          <li className={styles.pageLi} key={e}>
            <button className={pages === e? styles.buttonActive : styles.button} onClick={() => dispatch(setCurrentPage(e))}>{e}</button>
          </li>
        ))
      }

          <button className={styles.button2} disabled={pages === page} onClick={() => dispatch(setCurrentPage(pages + 1))} >Next</button>
      </ul>
    </nav>
    </div>
  )
}

export default Pagination