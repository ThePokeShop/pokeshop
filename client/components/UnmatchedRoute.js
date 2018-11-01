import React from 'react'
import { Link } from 'react-router-dom'
const UnmatchedRoute = () => {
  //cant get className to work for image size?
  //
  return (
    // <figure className="image is-900x600">
    //   <img src="https://www.itinfoclub.com/resources/media/404_1519125034_0.jpg" />
    //   <Link to='/products' class="button is-medium is-fullwidth is-danger">List of all products</Link>
    // </figure>

    <div className='body'>
      <div class="container">
        <div className="error">
          <p className="p">4</p>
          <span className="dracula">
            <div className="con">
              <div className="hair" />
              <div className="hair-r" />
              <div className="head" />
              <div className="eye" />
              <div className="eye eye-r" />
              <div className="mouth" />
              <div className="blod" />
              <div className="blod blod2" />
            </div>
          </span>
          <p className="p">4</p>
          <div className="page-ms">
            <p className="page-msg"> Oops, the page you're looking for Disappeared </p>
            <Link to='/products'><button type='button' className="go-back">Back to Products</button></Link>
          </div>
        </div>
      </div>
      <iframe style={{ width: 0, height: 0, border: "none" }} scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/510878118&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
    </div >
  )
}

export default UnmatchedRoute
