import { useState } from 'react'
import Error from '../Error/Error'
import './Questions.css'
import { toast } from 'react-toastify'

const Questions = ({ survey, handleQuestions, handleOptions, handleRemove, addOption, error, setError}: any) => {

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

    const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);



    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitClicked(true);
    
        let ans: any[] = [];
    
        const validQue = survey.questions?.every((que: queType) => {
            return que.questions.length >= 10;
        });
    
        survey.questions?.forEach((que: queType) => {
            if (que.type === 'Checkbox' || que.type === 'Radio') {
                ans[1] = que.type === 'Checkbox' || que.type === 'Radio';
                ans[2] = que.options.length >= 2; 
                ans[3] = que.questions.length >= 10;
            }
        });
    
        setError({
            ...error,
            title: survey.title === '',
            desc: survey.desc === ''
        });
    
        if (
            survey.title !== '' &&
            survey.desc !== '' &&
            survey.desc.replace(/\s/g, '').length > 40 &&
            (ans[1] ? ans[2] : true) && 
            validQue
        ) {
            console.log(survey);
            localStorage.setItem('survey',JSON.stringify(survey));
            toast.success('Submit Successfully!!');
            console.log('fromLocal: ',localStorage.getItem('survey'));
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
                                        { survey.questions[index].questions===''&& survey.questions[index].id === que.id &&
                                            <Error text={'Question is required'}/>
                                        }
                                        { survey.questions[index].questions.replace(/\s/g, '').length < 10 && survey.questions[index].questions !== '' && isSubmitClicked &&
                                                <Error text={'Question must contains char above 10'}/>
                                        }
                                    </div>
                                }
                                {(que.type === 'Checkbox' || que.type === 'Radio') &&
                                    <div className='checkbox'>
                                        <input type="text" placeholder='Enter your questions?' onChange={(e) => handleQuestions(e, index)} required />
                                        { survey.questions[index].questions==='' && survey.questions[index].id === que.id &&
                                            <Error text={'Question is required'}/>
                                        }
                                        { survey.questions[index].questions.replace(/\s/g, '').length < 10 && survey.questions[index].questions !== '' && isSubmitClicked &&
                                                <Error text={'Question must contains char above 10'}/> 
                                        }
                                        { survey.questions[index].options.length < 2 && 
                                                <Error text={'Please add at least two options'}/> 
                                        }
                                        {
                                            que?.options?.map((opt: opt, optIndex: number) => {
                                                return (
                                                    <div key={opt.id} className='options'>
                                                        <input type="text" placeholder='Option' onChange={(e) => handleOptions(e, index, optIndex)} required />
                                                        <button onClick={() => handleRemove(index, opt.id)}>Remove</button>
                                                        { survey.questions[index].options[optIndex].id === opt.id && survey.questions[index].options[optIndex].text === '' &&
                                                            <Error text={'Option is required'}/>
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
                    <input type='submit' disabled={survey.questions?.length === 0 && isSubmitClicked } />
                </div>
            </form>
        </div>
    )
}

export default Questions


