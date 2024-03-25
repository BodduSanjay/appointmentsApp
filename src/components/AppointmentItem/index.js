import {format} from 'date-fns'
import './index.css'

const AppointmentItem = ({appointment, toggleStar}) => {
  const {id, title, date, isStared} = appointment

  const link = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const change = () => {
    toggleStar(id)
  }

  return (
    <li>
      <div className="title-btn">
        <p>{title}</p>
        <button onClick={change} data-testid="star">
          <img src={link} alt="star" />
        </button>
      </div>
      <p className="para">{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </li>
  )
}
export default AppointmentItem
