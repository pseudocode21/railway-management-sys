import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRobot } from 'react-icons/fa';
import ChatbotUI from './ChatbotUI';

const ChatbotButton = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          padding: 0,
          zIndex: 1050,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
        aria-label="Open chatbot"
      >
        <FaRobot size={28} />
      </Button>

      <Modal show={show} onHide={handleClose} size="md" aria-labelledby="chatbot-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title id="chatbot-modal">Railway Assistant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChatbotUI />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatbotButton;
