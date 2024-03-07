import icon from '../../Assets/survey.png'
import './Navbar.css'
import formIcon from '../../Assets/formicon.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title'>
       <div>
        <img src={icon} alt="survey-icon"/>
       </div>
       <div>
        <h1>Survey</h1>
       </div>
      </div>
      <div className="blocks">
        <div className="formBlock">
          <div>
            <img src={formIcon} alt="form-icon"/>
          </div>
          <div className='survey-form'>
            <p>Form survey</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
