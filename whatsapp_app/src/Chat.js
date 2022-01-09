import React, {useState} from 'react';
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

function Chat({ messages }) {

    const [ input, setInput ] = useState("")
    const sendMessage = async (e)=>
    {
        e.preventDefault();
        await axios.post("api/chat/messages/new", {

        message: input,
        name: "demo app",
        timestamp: "just now",
        received: false,
        });

        setInput('');

    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerinfo">
                    <h3> Rommel palma </h3>
                    <p> Last seen at... </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined /> 
                    </IconButton>

                    <IconButton>
                        <AttachFile /> 
                    </IconButton>

                    <IconButton>
                        <MoreVert /> 
                    </IconButton>

                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) =>(
                    <p className={`chat__message ${message.received && "chat__reciever"}`}>
                    <spam className="chat__name"> {message.name} </spam>
                    {message.message}
                    <spam className="chat__timestamp"> {message.timestamp} </spam>
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}  
                        placeholder="Type a message" 
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message 
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}
export default Chat;

