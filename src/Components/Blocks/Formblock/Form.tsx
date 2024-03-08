import React, { useState } from 'react'
import './Form.css'
import Button from '../../Button/Button';
import Questions from './Questions/Questions';
import errorIcon from '../../../Assets/error.png'

const Form = () => {

  let optId = Math.ceil(Math.random() * 1000);
  let queId = Math.ceil(Math.random() * 10000);
  let typeArr = ['Input', 'Checkbox', 'Radio'];

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
    que: false,
    opt: false,
    optLen: false
  })

  function addQuestion(type: string) {
    const opt = [{ id: optId, text: '' }, { id: optId + 1, text: '' }];

    setSurvey((prevSurvey: any) => ({
      ...prevSurvey,
      questions: [
        ...prevSurvey.questions,
        type === 'Input' ? { id: queId, type: type, questions: '' } : { id: queId + 1, type: type, questions: '', options: opt }
      ],
    }));

    setError({
      ...error,
      desc: survey.desc === '',
      title: survey.title === ''
    })
  }

  function handleQuestions(e: React.ChangeEvent<HTMLInputElement>, index: number) {

    const copySurvey = { ...survey }; //copy of survey 
    const object = copySurvey.questions[index]; // taking que array
    object.questions = e.target.value; //updating that que

    setError({
      ...error,
      que: copySurvey.questions[index].questions === ''
    })
  }

  function handleOptions(e: React.ChangeEvent<HTMLInputElement>, index: number, optIndex: number) {

    const copySurvey = { ...survey }; //copy of survey
    const mainQue = { ...copySurvey.questions[index] }; // taking specific que
    mainQue.options[optIndex].text = e.target.value; //updating that ques option

    setError({
      ...error,
      opt: survey.questions[index].options[optIndex].text === ''
    })
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
              onChange={(e) => {
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
            {survey.title === '' && error.title &&
              (
                <div className='error'>
                  <img src={errorIcon} alt="icon" />
                  <p>Title is required</p>
                </div>
              )
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
                  title: survey.title === '',
                  desc: survey.desc === ''
                })
              }}
              required
            />
          </div>
          {error.desc &&
            <div className='error'>
              <img src={errorIcon} alt="icon" />
              <p>Description is required</p>
            </div>
          }
          {survey.desc.replace(/\s/g, '').length < 40 && survey.desc !== '' &&
            <div className='error'>
              <img src={errorIcon} alt="icon" />
              <p>Description must contains char above 40</p>
            </div>
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
        <Questions
          handleQuestions={handleQuestions}
          survey={survey}
          handleOptions={handleOptions}
          handleRemove={handleRemove}
          addOption={addOption}
          error={error}
          setError={setError}
        />
      </div>
    </div>

  )
}

export default Form
