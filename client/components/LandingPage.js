import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class LandingPage extends Component {
  render() {
    return (
      <div className='landing'>
        <section >

          <div >
            <div className="container">
              <div className="media">
                <div className="media-left">
                  <figure className='logo'>
                    <img src="https://fontmeme.com/permalink/181030/daad87fcebbaa61672816a5c6bb13e9c.png" />
                  </figure>
                </div>
                <div className="media-content">
                  <figure className="image is-5by3">
                    <img src="/landing.gif" />
                  </figure>
                </div>
                <div className="media-right">
                  <figure className="image is-128x128">
                    <img src="https://ubisafe.org/images/arrows-transparent-animated-gif-6.gif" />
                  </figure>
                </div>
              </div>
              {/* <Pikachu /> */}
            </div>
          </div>
        </section>

        <section className="container">
          <div className="columns features">
            <div className="column is-4">
              <div className="card is-shady">
                <div className="card-image has-text-centered">
                  <i className="fa fa-paw"></i>
                </div>
                <div className="card-content">
                  <div className="content">
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src="https://banner2.kisspng.com/20180319/yeq/kisspng-social-media-computer-icons-tulane-university-face-drawing-vector-twitter-5ab02d6b2d2322.1683580215214954031849.jpg" />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                            <br />
                            The Poke Shop is just the best!!
                            I bought a pokemon last Monday and it's so dope! <strong>#thePokeShop #pokemon #YoLo</strong>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card is-shady">
                <div className="card-image has-text-centered">
                  <i className="fa fa-empire"></i>
                </div>
                <div className="card-content">
                  <div className="content">
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src="https://banner2.kisspng.com/20171216/213/facebook-logo-png-5a35528eaa4f08.7998622015134439826976.jpg" />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>Tom Haverford</strong> <small>@swag</small> <small>31m</small>
                            <br />
                            [judge looks concerned]
"so, u want a divorce because ur wife chose Bulbasaur as her starter Pokemon?"
...
"GRANTED"
*Bangs gavel 500 times* <strong>#thePokeShop #pokemon #hahah #</strong>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card is-shady">
                <div className="card-image has-text-centered">
                  <i className="fa fa-apple"></i>
                </div>
                <div className="card-content">
                  <div className="content">
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src="https://banner2.kisspng.com/20180319/yeq/kisspng-social-media-computer-icons-tulane-university-face-drawing-vector-twitter-5ab02d6b2d2322.1683580215214954031849.jpg" />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>Ash</strong> <small>@ashPokeMaster</small> <small>31m</small>
                            <br />
                            me: PIKACHU I CHOOSE YOU!
                            Brock: Did you just say Pikachu?
                            me: Yeah? So?
                            Brock: Wow. I always thought he was called Pea Cashew.
                            <strong>#thePokeShop #pokemon #pokemonbattle</strong>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro column is-8 is-offset-2">
            <h2 className="title" id='pokemon'>Best place to get your Pokemons!</h2><br />
          </div>
          <div className="sandbox">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <figure className='image is-256x256'>
                    <img src='https://media.giphy.com/media/PGdd8hN2CKQYU/giphy.gif' />
                  </figure>
                </article>
              </div>
              {/* <div className="tile is-parent is-shady">

              </div> */}
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <Link to='/products/20'>

                    <p className="title">latest arrivals</p>
                    <figure className='image is-2by1'>
                      <img src='https://img.rankedboost.com/wp-content/uploads/2016/12/Pokemon-Sun-and-Moon-Pokeballs-List-300x300.png' />
                    </figure>

                  </Link>
                </article>
              </div>
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-8">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-white">
                      <p className="title">Fun facts</p>
                      <p className="subtitle">Some people think <strong>Pikachu</strong> is named after rabbit-like rodents called pikas, which live across Asia, North America and Eastern Europe. Not so!
"Pikachu" is actually a combination of two Japanese onomatopoeias, or words named after the sounds they make. In Japan, the crackle of electricity is said to make a "pika pika" sound, and the sound mice make is "chu."
Put them together, and you've got everyone's favorite electric-type mouse!</p>
                    </article>

                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-white">
                      <p className="title">Poké trainer of the month</p>

                      <figure className="image is-4by3">
                        <img src="https://vignette.wikia.nocookie.net/ideas/images/9/9f/Ash_ketchum_render_by_tzblacktd-da9k0wb.png/revision/latest?cb=20180427162023" alt="Description" />
                      </figure>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-shady">
                  <article className="tile is-child notification is-white">
                    <p className="title">Authors</p>
                    <p className="subtitle">GS 1809</p>
                    <div className="columns">
                      <div className="column">
                        Dilan
                        <figure className="image ">
                          <img className=' is-rounded' src="/dilan.png" />
                        </figure>
                      </div>
                      <div className="column">
                        Roy
                        <figure className="image">
                          <img className=' is-rounded' src="/roy.png" />
                        </figure>
                      </div>
                      <div className="column">
                        David
                        <figure className="image ">
                          <img className=' is-rounded' src="/david.png" />
                        </figure>
                      </div>
                      <div className="column">
                        Dan
                        <figure className="image">
                          <img className=' is-rounded' src="/dan.png" />
                        </figure>

                      </div>
                      <div className="column">
                        Josh
                        <figure className="image">
                          <img className=' is-rounded' src="/josh.png" />
                        </figure>

                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <div className="content">
                    <p className="title">History of Pokemon</p>
                    <p className="subtitle">With even more content</p>
                    <div className="content">
                      <p>The history of the Pokémon media franchise spans over two decades from when work began officially on the first game to now, and has roots even older.</p>  <p>It started simply enough as a hobby of Satoshi Tajiri, who as a child had a fondness for catching insects and tadpoles near his home in suburban Tokyo. Over time, Tajiri decided to put his idea of catching creatures into practice, to give children the same thrills he had as a child.</p> <p>With the help of Ken Sugimori and other friends, Tajiri formed Game Freak and much later the design studio known as Creatures. When Tajiri discovered the Game Boy and the Game Boy Game Link Cable, it gave him the image of insects traveling along the wire. Tajiri was also heavily influenced by the Ultraman fantasy television show, Ultra Seven, in which the protagonist used giant monsters contained within small capsules to help him fight. Together, these two sources gave him the idea for a new game called Capsule Monsters. After several failed attempts at pitching this idea to Nintendo, Tajiri's new friend Shigeru Miyamoto pitched it to the company, and Nintendo began to fund the project, spending six years developing the games that would become a worldwide sensation. Due to trademarking issues, the name "Capsule Monsters" was changed to "Pocket Monsters".</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>


          </div>

        </section>
        <iframe style={{ width: 0, height: 0, border: "none" }} scrolling="no" frameBorder="no" allow="autoplay" src="/music.mp3" />
      </div >

    )
  }
}

export default LandingPage
