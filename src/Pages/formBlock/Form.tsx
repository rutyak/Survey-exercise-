import React, { useState } from 'react'
import './Form.css'


const Form = () => {

  let optId = Math.ceil(Math.random()* 1000);
  console.log('optId',optId);

  const [error, setError] = useState<boolean>(false);

  type typeTitleDesc = {
    title: string,
    desc: string
  }
  const [titleDesc, setTitleDesc] = useState<typeTitleDesc>({
    title: '',
    desc:''
  })

  type optType = {
    id:number,
    text:string
  }

  type queType = {
    type: string,
    question: string,
    options: optType[]
  } 

  const initialize = [{
    id:1,
    text:''
  }]
  const [que, setQue] = useState<queType[]>([{ type: '', question: '', options: initialize}])

  function addQuestion(type: string) {

    if(titleDesc.title === '' || titleDesc.desc === ''){
      setError(true);
    }
    else{
      setError(false);
      const opt = type!=='input'? [{id:optId, text:''}] : [];
      setQue([
        ...que,
        { type: type, question: '', options: opt }
      ])
    }
  }

  function handleQuestions(e: React.ChangeEvent<HTMLInputElement>, index: number) {

    const questions = [...que]; //copy of que array
    const object = questions[index]; // taking specific que
    object.question = e.target.value; //updating that que
  }

  function handleOptions(e: React.ChangeEvent<HTMLInputElement>, index: number, optIndex: number, id:number) {

    const question = [...que]; //copy of que array
    const mainQue = {...question[index]}; // taking specific que
    mainQue.options[optIndex].text = e.target.value; //updating that que
  }

  function addOption(type: string, index: number){
    const updatedQue = [...que];  //copy of entire que
    const opt = [...updatedQue[index].options,{id:optId, text:''}];

    updatedQue[index]={ 
      ...updatedQue[index], //copy of specific que
      options: opt  //specific que object
    };
    
    setQue(updatedQue);
  }

  function handleRemove(e:any, index: number, optIndex: number, id:number){
    console.log('index: ',optIndex)
    console.log('handleRemove clicked')
    const removed = que[index]?.options?.filter((opt:any,i:number)=>(id !== opt.id));
    console.log('removed: ',removed)

     const copyQue = [...que];
     
     copyQue[index] = {
       ...copyQue[index],
       options: removed
     }
     setQue(copyQue)
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
            }
            required
            />
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
            }
            required
            />
          </div>
          {error?<p style={{'color':'red', 'textAlign':'center', 'marginTop': '1rem'}}>Please fill all the fields</p>:''}
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
          <form action="">
          {
            que?.map((ques: any, index: number) => {
              return (
                <div key={index}>
                  {ques.type === 'input' &&
                    <div>
                      <input type="text" placeholder='Enter your question?' onChange={(e) => handleQuestions(e, index)} required/>
                    </div>
                  }
                  {(ques.type === 'checkbox' || ques.type === 'radio') &&
                    <div className='checkbox'>
                      <input type="text" placeholder='Enter your question?' onChange={(e) => handleQuestions(e, index)} required/>
                      {/* {error? <p style={{'color':'red'}}>Please fill the field</p>:''} */}
                      {
                        ques?.options?.map((opt:any, optIndex: number)=>{
                          return (
                            <div key={opt.id} className='options'>
                                <input type="text" placeholder='Option' onChange={(e) => handleOptions(e, index, optIndex, opt.id)} required/>
                                <button onClick={(e)=>handleRemove(e, index, optIndex, opt.id)}>Remove</button>
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
            <input type='submit'/>
          </div>
        </form>
        </div>
      </div>
    </div>

  )
}

export default Form
