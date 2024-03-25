import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], normalList: true}

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title.trim() !== '' && date.trim() !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStared: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  starredList = () => {
    const {appointmentsList, normalList} = this.state
    const starredList = appointmentsList.filter(each => each.isStared)

    this.setState({
      appointmentsList: normalList ? starredList : appointmentsList,
      normalList: !normalList,
    })
  }

  toggleStar = id => {
    const {appointmentsList} = this.state
    const updateapt = appointmentsList.map(each => {
      if (each.id === id) {
        return {...each, isStared: !each.isStared}
      }
      return each
    })
    this.setState({appointmentsList: updateapt})
  }

  render() {
    const {appointmentsList, title, date, normalList} = this.state
    return (
      <div className="bg-cont">
        <div className="top-container">
          <form className="form-cont">
            <h1 className="heading">Add Appointment</h1>
            <label htmlFor="textInput">TITLE</label>
            <input
              type="text"
              value={title}
              onChange={this.updateTitle}
              id="textInput"
            />
            <label htmlFor="dateInput">DATE</label>
            <input
              type="date"
              value={date}
              onChange={this.updateDate}
              id="dateInput"
            />
            <button
              type="submit"
              className="add-btn"
              onClick={this.addAppointment}
            >
              Add
            </button>
          </form>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
        </div>
        <div className="down-container">
          <div className="header">
            <h1 className="heading">Appointments</h1>
            <button
              className={normalList ? 'Starred-btn' : 'btn2'}
              onClick={this.starredList}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul>
            {appointmentsList.map(appointment => (
              <AppointmentItem
                appointment={appointment}
                key={appointment.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
