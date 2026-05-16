import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRobot } from 'react-icons/fa';
import ChatbotUI from '../components/ChatbotUI';

const Chatbot = () => {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <div className="text-center mb-4">
            <FaRobot size={48} color="#0d6efd" className="mb-3" />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#212529' }}>Railway Assistant</h2>
            <p className="text-muted" style={{ fontSize: '14px' }}>Get instant help with train bookings, schedules, and travel information</p>
          </div>
          <ChatbotUI />
        </Col>
      </Row>
    </Container>
  );
};

export default Chatbot;
