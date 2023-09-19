import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../App.css'; 

function AboutUs() {
  return (
    <Container className="about-us">
      <Row className="mb-5">
        <Col>
          <h1>About Us</h1>
          <p>Your Company Slogan or Introduction</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image src="team-image.jpg" fluid />
        </Col>
        <Col md={6}>
          <h2>Our Story</h2>
          <p>
            Write a brief history or description of your company or team. Explain your mission, vision, and values.
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Our Team</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Image src="team-member1.jpg" roundedCircle />
          <h3>John Doe</h3>
          <p>Co-founder & CEO</p>
        </Col>
        <Col md={4}>
          <Image src="team-member2.jpg" roundedCircle />
          <h3>Jane Smith</h3>
          <p>CTO</p>
        </Col>
        <Col md={4}>
          <Image src="team-member3.jpg" roundedCircle />
          <h3>Alice Johnson</h3>
          <p>Head of Marketing</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Contact Us</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
            If you have any questions or inquiries, feel free to contact us at{' '}
            <a href="mailto:info@example.com">info@example.com</a>.
          </p>
        </Col>
        <Col md={6}>
          {/* Add social media icons or links here */}
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;