import icon from '../../Assets/survey.png'
import './Navbar.css'
import formIcon from '../../Assets/formicon.png'
import preview from '../../Assets/preview.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title'>
        <div>
          <img src={icon} alt="survey-icon" />
        </div>
        <div>
          <h1>Survey</h1>
        </div>
      </div>
      <div className="blocks">
        <Link to='/'>
          <div className="formBlock">
            <div>
              <img src={formIcon} alt="form-icon" />
            </div>
            <div className='survey-form'>
              <p>Form survey</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="blocks">
        <Link to='/preview'>
          <div className="preview">
            <div>
              <img src={preview} alt="form-icon" />
            </div>
            <div className='survey-form'>
              <p>Preview</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
