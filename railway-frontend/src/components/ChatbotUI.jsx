import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FaRobot, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import chatbotApi from '../api/chatbotApi';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  return ( 
    <div
      className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {!isUser && (
        <div className="me-2 d-flex align-items-center">
          <FaRobot size={32} color="#0d6efd" aria-label="Bot avatar" />
        </div>
      )}
      <div
        className={`p-3 rounded shadow-sm ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}
        style={{ maxWidth: '75%', borderRadius: '8px' }}
      >
        {message.text}
      </div>
      {isUser && (
        <div className="ms-2 d-flex align-items-center">
          <FaUser size={32} color="#6c757d" aria-label="User avatar" />
        </div>
      )}
    </div>
  );
};

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { id: 0, sender: 'bot', text: 'Hello! How can I assist you with your railway bookings today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null
    
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatbotApi.post('/chat', input.trim());
      const botMessage = { id: Date.now() + 1, sender: 'bot', text: response.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="border rounded shadow-sm p-3"
      style={{ maxWidth: 600, backgroundColor: '#f8f9fa', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      aria-label="Chatbot container"
    >
      <Row>
        <Col>
          <div
            style={{ minHeight: 400, maxHeight: '70vh', overflowY: 'auto', padding: '1rem' }}
            aria-live="polite"
            aria-relevant="additions"
            role="log"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form onSubmit={handleSend} aria-label="Chat input form">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                aria-label="Message input"
                style={{ borderRadius: '8px 0 0 8px' }}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                {loading ? <FaSpinner className="spin" /> : <FaPaperPlane />}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatbotUI;
