import React, { Component } from 'react'

export class LandingPage extends Component {
  render() {
    return (
      <div className="hero-body is-centered">
        <figure className="image is-2by1">
          <img src="/poke-balls.jpg" />
        </figure>

        <div className="container has-text-centered">
          <div className="column is-10 is-centered">
            <h1 className="title">
              Coming Soon ---- (╯°□°)╯︵◓
              </h1>
            <h2 className="subtitle">
              Here we can put some info about our latest pokemons
              </h2>
            <div className="box">
              <div className="field is-grouped">
                <p className="control is-expanded">
                  <input className="input" type="text" placeholder="Enter your email" />
                </p>
                <p className="control">
                  <a className="button is-info">
                    Notify Me
                          </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default LandingPage
