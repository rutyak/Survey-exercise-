import React, { useState } from 'react'
import './Form.css'


const Form = () => {

  type typeTitleDesc = {
    title: string,
    desc: string
  }
  const [titleDesc, setTitleDesc] = useState<typeTitleDesc>({
    title: '',
    desc:''
  })

  type queType = {
    type: string,
    question: string,
    options: string[]
  } 
  const [que, setQue] = useState<queType[]>([{ type: '', question: '', options: [] }])

  function addQuestion(type: string) {
    const opt = type !== 'single' ? [''] : [];
    setQue([
      ...que,
      { type: type, question: '', options: opt }
    ])
  }

  function handleQuestions(e: React.ChangeEvent<HTMLInputElement>, index: number) {

    const questions = [...que]; //copy of que array
    const object = questions[index]; // taking specific que
    object.question = e.target.value; //updating that que
  }
  console.log('que',que)
  console.log('titleDesc',titleDesc)

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
            onChange={(e)=>
               setTitleDesc({
                ...titleDesc,
                title: e.target.value
               })
            }/>
          </div>
          <div className='desc'>
            <label htmlFor="desc">Description:</label>
            <input 
            type="text" 
            id='desc' 
            placeholder='Enter description' 
            onChange={(e)=>
              setTitleDesc({
               ...titleDesc,
               desc: e.target.value
              })
            }/>
          </div>
        </div>
        <div className='input-type-btn'>
          <button onClick={() => addQuestion('input')}>
            <p>Input</p>
          </button>
          <button onClick={() => addQuestion('checkbox')}>
            <p>Checkbox</p>
          </button>
          <button onClick={() => addQuestion('radio')}>
            <p>Radio</p>
          </button>
        </div>
        <div className='questions'>
          {
            que?.map((ques: any, index: number) => {
              return (
                <div key={index}>
                  {ques.type === 'input' &&
                    <input type="text" placeholder='Enter your question?' onChange={(e) => handleQuestions(e, index)} />
                  }
                  {(ques.type === 'checkbox' || ques.type === 'radio') &&
                    <div className='checkbox'>
                      <input type="text" placeholder='Enter your question?' onChange={(e) => handleQuestions(e, index)} />
                      <button>Add options</button>
                    </div>
                  }
                </div>
              )
            })
          }
          <div className='submit-btn'>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Form
