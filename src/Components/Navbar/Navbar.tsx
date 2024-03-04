import icon from '../../Assets/qualitative-research.png'
import './Navbar.css'
import formIcon from '../../Assets/exam.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title'>
       <div>
        <img src={icon} alt=""/>
       </div>
       <div>
        <h1>Survey</h1>
       </div>
      </div>
      <div className="blocks">
        <div className="formBlock">
          <div>
            <img src={formIcon} alt="form"/>
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
