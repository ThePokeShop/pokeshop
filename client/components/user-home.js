import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  state = {
    loading: true,
    active: false
  }
  async componentDidMount() {
    let status = 'shipped'
    await this.props.fetchOrders(status) // fetch results using URL
    this.setState({loading: false})
  }
  handleClick(){
    let currentState = this.state.active
    this.setState({
      active: !currentState
    })
  }
  render() {
    const loading = this.state.loading
    if (loading) {
      return (
        <div className="main-content columns is-fullheight">
          <div className="container column">
            <div className="is-3">Loading...</div>
          </div>
        </div>
      )
    }
    const {email, name, isAdmin} = this.props
    const objSize = obj => {
      var size = 0,
        key
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++
      }
      return size
    }
    const orderSize = objSize(this.props.userOrders)
    console.log('userOrder', this.props.userOrders)
    return (
      <div className="container">
        <section className="hero is-info welcome is-small">
          <div className="hero-body">
            {isAdmin ? (
              <div className="container">
                <h1 className="title">Hello, admin {name}.</h1>
                <h2 className="subtitle">
                  I hope you are selling more pokémon!
                </h2>
              </div>
            ) : (
              <div className="container">
                <h1 className="title">Hello, {name}.</h1>
                <h2 className="subtitle">
                  I hope you are buying more pokémon!
                </h2>
              </div>
            )}
          </div>
        </section>
        <section className="info-tiles">
          <div className="tile is-ancestor has-text-centered">
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">{orderSize}</p>
                <p className="subtitle">Order Made</p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">59k</p>
                <p className="subtitle">Products Bought</p>
              </article>
            </div>
          </div>
        </section>

        {isAdmin ? (
          <section className="info-tiles">
            <div className="tile is-ancestor has-text-centered">
              <div className="tile is-parent is-3">
                <article className="tile is-child box">
                  <div className="panel">
                    <div className="panel-heading">Past Orders</div>
                    <p className="panel-tabs">
                      <a className={this.state.active ? 'is-active': null} onClick={this.handleClick}>Mine</a>
                      <a className={this.state.active ? 'your_className': null} onClick={this.handleClick}>All User</a>
                    </p>
                    <div className="panel-block">
                      <p className="control has-icons-left">
                        <input
                          className="input is-small"
                          type="text"
                          placeholder="search by ID"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-search" aria-hidden="true" />
                        </span>
                      </p>
                    </div>
                    <p className="panel-tabs"> map me</p>
                  </div>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <div className="panel">
                    <div className="panel-heading">
                      Order: "order id" by "name"
                    </div>
                    <div className="tile is-child box">
                      {/* <div className="content" />  need to map with order item and total */}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        ) : (
          <section className="info-tiles">
            <div className="tile is-ancestor has-text-centered">
              <div className="tile is-parent is-3">
                <article className="tile is-child box">
                  <div className="panel">
                    <div className="panel-heading">Past Orders</div>
                    <p className="control has-icons-left">
                        <input
                          className="input is-small"
                          type="text"
                          placeholder="search by ID"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-search" aria-hidden="true" />
                        </span>
                      </p>
                    <div className="tile is-child box">
                      {/* <div className="content" />  need to map with order item and total */}
                    </div>
                  </div>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <div className="panel">
                    <div className="panel-heading">Order: "order id"</div>
                    <p className="panel-tabs"> map me</p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    isAdmin: state.user.isAdmin,
    userOrders: state.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: status => dispatch(fetchOrders(status))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
