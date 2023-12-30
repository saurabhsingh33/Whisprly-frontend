import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import Logout from "./logout";
import ChatInput from "./chatInput";
// import Messages from "./messages";
import axios from "axios";
import { useSocket } from "../context/socketProvider";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const { sendMessage, messages } = useSocket();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setCurrentMessages(res.data);
    }
    fetchData();
    // eslint-disable-next-line
  }, [currentChat]);
  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessages((prev) => [
        ...prev,
        {
          fromSelf: messages[messages.length - 1].from === currentUser._id,
          message: messages[messages.length - 1].message,
        },
      ]);
    }
    // eslint-disable-next-line
  }, [messages]);
  const handleSendMessage = async (msg) => {
    const body = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    sendMessage(body);
    await axios.post(sendMessageRoute, body);
  };
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="userName">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {currentMessages.map((message) => {
              return (
                <div>
                  <div
                    className={`message ${
                      message.fromSelf ? "sent" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .userName {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
