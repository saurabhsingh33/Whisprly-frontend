import React, { useState, useEffect } from "react";
import apiClient from "../utils/common";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/contacts";
import Welcome from "./welcome";
import ChatContainer from "../components/chatContainer";

const ChatPage = () => {
  const navigate = useNavigate();
  // const { sendMessage, messages } = useSocket();
  // const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("whisprly-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("whisprly-user")));
        setIsLoaded(true);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await apiClient.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    // <div>
    //   <div>
    //     <input onChange={e => setMessage(e.target.value)} className={classes['chat-input']} placeholder="Message" />
    //     <button onClick={e => sendMessage(message)} className={classes['send-btn']}>Send</button>
    //   </div>
    //   <div>
    //     {messages.map(e => <li>{e}</li>)}
    //   </div>
    // </div>
    <Container>
      <div className="container">
        {contacts && (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        )}
        {isLoaded && currentChat === undefined && (
          <Welcome currentUser={currentUser} />
        )}
        {isLoaded && currentChat && (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default ChatPage;
