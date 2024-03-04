import React, { useState } from 'react'
import './Form.css'
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import errorIcon from '../../Assets/381599_error_icon.png'

const Form = () => {

  let optId = Math.ceil(Math.random() * 1000);
  let typeArr = ['Input', 'Checkbox', 'Radio'];

  type opt = {
    id: number,
    text: string
  }

  type queType = {
    type: string,
    questions: string,
    options: opt[]
  }

  type surveyType = {
    title: string,
    desc: string,
    questions: queType[]
  }

  const [survey, setSurvey] = useState<surveyType>({
    title: '',
    desc: '',
    questions: []
  })

  const [error, setError] = useState<any>({
    title: false,
    desc: false,
    descLen: false
  })

  function addQuestion(type: string) {
    const opt = [{ id: optId, text: '' }, { id: optId + 1, text: '' }];

    setSurvey((prevSurvey: any) => ({
      ...prevSurvey,
      questions: [
        ...prevSurvey.questions,
        type === 'Input' ? { type: type, questions: '' } : { type: type, questions: '', options: opt }
      ],
    }));

    setError({
      ...error,
      desc: survey.desc === ''
    })
  }

  function handlesurveystions(e: React.ChangeEvent<HTMLInputElement>, index: number) {

    const copySurvey = { ...survey }; //copy of survey 
    const object = copySurvey.questions[index]; // taking que array
    object.questions = e.target.value; //updating that que
  }

  function handleOptions(e: React.ChangeEvent<HTMLInputElement>, index: number, optIndex: number) {

    const copySurvey = { ...survey }; //copy of survey
    const mainQue = { ...copySurvey.questions[index] }; // taking specific que
    mainQue.options[optIndex].text = e.target.value; //updating that ques option
  }

  function addOption(index: number) {
    const copySurvey = { ...survey };  //copy of entire survey
    const opt = [...copySurvey.questions[index].options, { id: optId, text: '' }];

    copySurvey.questions[index] = {
      ...copySurvey.questions[index], //copy of specific que
      options: opt  //updating specific ques options
    };

    setSurvey(copySurvey);
  }

  function handleRemove(index: number, id: number) {

    const removed = survey.questions[index]?.options?.filter((opt: opt) => (id !== opt.id));
    const copysurvey = { ...survey };

    copysurvey.questions[index] = {
      ...copysurvey.questions[index],
      options: removed
    }
    setSurvey(copysurvey)
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(survey)
    toast.success('Submit Successfully!!')
  }

  console.log('desclength: ', survey.desc.trim().length);

  return (
    <div className='form-container'>
      <h2>Survey</h2>
      <div className='form-survey'>
        <div className='title-desc'>
          <div className='title'>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id='title'
              placeholder='Enter title'
              onChange={(e) =>{
                setSurvey({
                  ...survey,
                  title: e.target.value
                })
                setError({
                  ...error,
                  title: survey.title === ''
                })
              }
              }
              required
            />
            {error.title ? (
              <div className='error'><img src={errorIcon} alt="icon" /><p>Title is required</p></div>
            ) : ''
            }
          </div>
          <div className='desc'>
            <label htmlFor="desc">Description:</label>
            <textarea
              id='desc'
              placeholder='Enter description'
              onChange={(e) => {
                setSurvey({
                  ...survey,
                  desc: e.target.value
                })
                setError({
                  ...error,
                  title: survey.title === ''
                })
              }}
              required
            />
          </div>
            { 
              error.desc ? <div className='error'><img src={errorIcon} alt="icon" /><p>Description is required</p></div> : ''
            }
            { 
              error.descLen? <div className='error'><img src={errorIcon} alt="icon" /><p>Description must contains 30 to 40 char</p></div> : ''
            }
        </div>
        <div className='input-type-btn'>
          {
            typeArr?.map((btn: string, index: number) => (
              <div key={index}>
                <Button addQuestion={addQuestion} text={btn} type={btn} />
              </div>
            ))
          }
        </div>
        <div className='questions'>
          <form action="" onSubmit={(e) => handleSubmitForm(e)}>
            {
              survey.questions?.map((que: queType, index: number) => {
                return (
                  <div key={index}>
                    {que.type === 'Input' &&
                      <div>
                        <input type="text" placeholder='Enter your surveystion?' onChange={(e) => handlesurveystions(e, index)} required />
                      </div>
                    }
                    {(que.type === 'Checkbox' || que.type === 'Radio') &&
                      <div className='checkbox'>
                        <input type="text" placeholder='Enter your questions?' onChange={(e) => handlesurveystions(e, index)} required />
                        {
                          que?.options?.map((opt: opt, optIndex: number) => {
                            return (
                              <div key={opt.id} className='options'>
                                <input type="text" placeholder='Option' onChange={(e) => handleOptions(e, index, optIndex)} required />
                                <button onClick={() => handleRemove(index, opt.id)}>Remove</button>
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
      </div>
    </div>

  )
}

export default Form
