import { useState } from 'react';
import './App.css';
import  { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  
  const apikey = import.meta.env.VITE_API_GEMINI_KEY;
  
  //store data use state hook
  //destructuring the useState into prompt and setPrompt
  //prompt is the input from the user
  //setPrompt is the function that used to update the prompt
  const [prompt, setPrompt] = useState("");

  //store the response from the user and show on screen using useState
  const [response, setResponse] = useState([]);

async  function fetchChatResponseFromGemini(){
  const genAI = new GoogleGenerativeAI(apikey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  setResponse([...response, { prompt: prompt, response: result.response.text()}]);
  setPrompt("");


}

  return (
    <>
     <h1 className="heading">AI Chat Bot</h1>
      <div className="Chatbot_container">

        <div className="Chatbot_response_container">
          {
            response.map((res,index)=>(
               <div key={index} className="response">
                <p className='Chatbot_prompt'>
                 <strong>user:</strong>  {res.prompt}
                 </p>
                 <p className='Chatbot_response'>
                  <strong>chatbot:</strong> {res.response}</p>
               </div>
             )
           )
          }

        </div>

        <div className="Chatbot_input">

          <input type="text" name="input" placeholder="Enter your question" className="input" value={prompt} onChange ={(e)=>{
            setPrompt(e.target.value);
          }} />

          <button type="button" onClick={fetchChatResponseFromGemini} >submit</button>
        </div>

      </div>
    </>
  )
}

export default App
