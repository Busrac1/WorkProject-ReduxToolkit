import React from 'react'
import { NavLink  } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h2>İş Takip</h2>
        <div>
            {/* sayfanın bulunduğu elemana aktif class verir diye navlink kullnaıdk. */}

            <NavLink to='/'>İş Listesi</NavLink>
            <NavLink to='/add-job'>İş Ekle</NavLink>
        </div>
    </header>
  )
}

export default Header