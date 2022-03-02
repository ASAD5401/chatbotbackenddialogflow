import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react"
const axios = require('axios');

function App() {

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);


  function sendMessage(e) {
    e.preventDefault();

    console.log("text: ", text);

    setMessages((prev) => {
      return [{ sender: "user", text: text }, ...prev];
    });


    // const dev = "http://localhost:7001"
    const dev="https://chatbotbackenddialogflow.herokuapp.com"
    const baseUrl = (window.location.hostname.split(":")[0] === "localhost") ? dev : "";

    axios.post(`${baseUrl}/talktochatbot`, {
      text: text
    })
      .then((response) => {
        console.log("response", response.data.text);

        setMessages((prev) => {
          return [{ sender: "bot", text: response.data.text }, ...prev];
        });
        e.target.reset();
        setText("");

      }).catch(error => {
        console.log("error: ", error);

        setMessages((prev) => {
          return [{ sender: "bot", text: "dummy response from chatbot" }, ...prev,];
        });
        e.target.reset();
        setText("");

      })
  }

  return (
    <div className='main'>
    <h1 className='header'>TALK TO CHATBOT</h1>

      <Form onSubmit={sendMessage}>
        <Form.Group
                  className="input"
                  // className={["mb-3",'input']}


          style={{
            display: "flex",
            justifyContent: "space-around"
          }}  controlId="formBasicEmail">

          <Form.Control

          className='main-inp'
            onChange={(e) => { setText(e.target.value) }}
            type="text"
            placeholder="Enter your message"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>

      <br />
      <br />
      <br />

      <div 
       style={{ display: "flex", flexDirection: "column" }}>

        {messages?.map((eachMessage, eachMessageIndex) => (
          <div className={ (eachMessage.sender === "user") ? "me" : "dialogflow"}
           key={`${eachMessageIndex}-message`} style={{
            display: "flex",
            justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
          }}>
            <div>{eachMessage.text}</div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
