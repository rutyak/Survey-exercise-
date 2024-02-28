import React, { useState } from 'react'
import './Form.css'


const Form = () => {

  const [error, setError] = useState<boolean>(false);

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
    const opt = [''];
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

  function handleOptions(e: React.ChangeEvent<HTMLInputElement>, index: number, optIndex: number) {

    const question = [...que]; //copy of que array
    const mainQue = {...question[index]}; // taking specific que
    mainQue.options[optIndex] = e.target.value; //updating that que
  }

  function addOption(type: string, index: number){
    const updatedQue = [...que];  //copy of entire que
    const opt = [...updatedQue[index].options,''];

    updatedQue[index]={ 
      ...updatedQue[index], //copy of specific que
      options: opt  //specific que object
    };
    
    setQue(updatedQue);
  }

  function handleRemove(e:any, index: number, optIndex: number){
    console.log('index: ',optIndex)
    console.log('handleRemove clicked')
    const removed = que[index]?.options?.filter((_,i)=>(optIndex !== i));
    console.log('removed: ',removed)

     const copyQue = [...que];
     
     copyQue[index] = {
       ...copyQue[index],
       options: removed
     }
     setQue(copyQue)
  }

  function handleSubmit(){
     console.log('Submit clicked');
     que?.map((que:any, index:number)=>{
          if(que.question === ''){
            setError(true);
          }
     })
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
                      {
                        ques?.options?.map((opt:any, optIndex: number)=>{
                          return (
                            <div key={optIndex} className='options'>
                                <input type="text" placeholder='Option' onChange={(e) => handleOptions(e, index, optIndex)} />
                                <button onClick={(e)=>handleRemove(e, index, optIndex)}>Remove</button>
                            </div>
                          )
                        })
                      }
                      <button onClick={() => addOption('radio',index)}>Add options</button>
                    </div>
                  }
                </div>
              )
            })
          }
          <div className='submit-btn'>
            <button onClick={()=>handleSubmit()}>Submit</button><br />
            {error? <p style={{'color':'red'}}>Please fill all the fields</p>:''}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Form
