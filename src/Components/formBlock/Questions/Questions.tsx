import './Questions.css'
import errorIcon from '../../../Assets/381599_error_icon.png'
import { toast } from 'react-toastify'

const Questions = ({ survey, handleQuestions, handleOptions, handleRemove, addOption }: any) => {

    type opt = {
        id: number,
        text: string
    }

    type queType = {
        id: number,
        type: string,
        questions: string,
        options: opt[]
    }

    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(survey.title!=='' && survey.desc!=='' && survey.desc.replace(/\s/g, '').length > 40){
            console.log(survey)
            toast.success('Submit Successfully!!')
        }
      }
    return (
        <div className='questions'>
            <form action="" onSubmit={(e) => handleSubmitForm(e)}>
                {
                    survey.questions?.map((que: queType, index: number) => {
                        return (
                            <div key={que.id}>
                                {que.type === 'Input' &&
                                    <div>
                                        <input type="text" placeholder='Enter your questions?' onChange={(e) => handleQuestions(e, index)} required />
                                        {(survey.questions[index].id === que.id ? survey.questions[index].questions === '' : '') ? (
                                            <div className='error que-error'><img src={errorIcon} alt="icon" /><p>Question is required</p></div>
                                        ) : ''
                                        }
                                        {
                                            survey.questions[index].questions.replace(/\s/g, '').length < 10 && survey.questions[index].questions !== ''  ?(
                                                <div className='error que-error'><img src={errorIcon} alt="icon" /><p>Question must contains char above 10</p></div> 
                                            ) : ''
                                        }
                                    </div>
                                }
                                {(que.type === 'Checkbox' || que.type === 'Radio') &&
                                    <div className='checkbox'>
                                        <input type="text" placeholder='Enter your questions?' onChange={(e) => handleQuestions(e, index)} required />
                                        {(survey.questions[index].id === que.id ? survey.questions[index].questions === '' : '') ? (
                                            <div className='error que-error'><img src={errorIcon} alt="icon" /><p>Question is required</p></div>
                                        ) : ''
                                        }
                                        {
                                            survey.questions[index].questions.replace(/\s/g, '').length < 10 && survey.questions[index].questions !== ''  ?(
                                                <div className='error que-error'><img src={errorIcon} alt="icon" /><p>Question must contains char above 10</p></div> 
                                            ) : ''
                                        }
                                        {
                                            que?.options?.map((opt: opt, optIndex: number) => {
                                                return (
                                                    <div key={opt.id} className='options'>
                                                        <input type="text" placeholder='Option' onChange={(e) => handleOptions(e, index, optIndex)} required />
                                                        <button onClick={() => handleRemove(index, opt.id)}>Remove</button>
                                                        {(survey.questions[index].options[optIndex].id === opt.id ? survey.questions[index].options[optIndex].text === '' : '') ? (
                                                            <div className='error que-error'><img src={errorIcon} alt="icon" /><p>Option is required</p></div>
                                                        ) : ''
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        <button onClick={() => addOption(index)}>Add options</button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className='submit-btn'>
                    <input type='submit' disabled={survey.questions?.length === 0} />
                </div>
            </form>
        </div>
    )
}

export default Questions
