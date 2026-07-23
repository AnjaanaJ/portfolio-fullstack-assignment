import { useState } from 'react';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) {
      setError('Enter a valid name');
      return;
    }
    if (!validateEmail(email.trim())) {
      setError('Enter a valid email');
      return;
    }
    if (message.trim().length < 10) {
      setError('Message too short');
      return;
    }

    setSuccessMsg('✓ Message validated successfully');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="section-title">
        <span>Contact</span>
        <h2>Get in touch with me</h2>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <h3>Email</h3>
              <p>anjanajanani6@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-brands fa-github"></i>
            </div>
            <div>
              <h3>GitHub</h3>
              <p>github.com/AnjaanaJ</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
            <div>
              <h3>LinkedIn</h3>
              <p>Anjana Kamburugamuwa</p>
            </div>
          </div>
        </div>

        <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {error && <p style={{ color: 'var(--clr-error, #f44)', margin: '0.5rem 0' }}>{error}</p>}
          {successMsg && (
            <p id="formSuccess" style={{ color: 'var(--clr-accent)', margin: '0.5rem 0' }}>
              {successMsg}
            </p>
          )}

          <button className="btn primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
