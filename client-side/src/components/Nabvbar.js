import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Nabvbar() {

  return (
    <div>
            <nav style={ { display : 'flex' , justifyContent : 'space-between' }} className="navbar  navbar-expand-lg bg-body-tertiary">
            <div style={ { display : 'flex' , justifyContent : 'space-between' , position : 'relative' }}  className="container d-flex">
            <Link className="navbar-brand" to="/">twitty</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul style={ { width : '55%' , display : 'flex' , justifyContent : 'space-between' , position : 'absolute' , right : '0' } } className="navbar-nav m-auto mb-2 mb-lg-0  d-flex">
                <div className='d-flex'>
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/users">Users</Link>
                    </li>
                </div>
                <div className='d-flex'>
                    <li><Link className="nav-link" to="/register">Inscription</Link></li>
                    <li><Link className="nav-link" to="/login">Connexion</Link></li>
                    <li><Link className="nav-link" to="#">Deconnexion</Link></li>
                </div>
                </ul>
            </div>
            </div>
            </nav>
</div>
  )
}

export default Nabvbar