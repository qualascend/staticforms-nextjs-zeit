import { useState } from 'react';
import 'bulma/css/bulma.min.css';

const Home = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '', // if any value received in this field, form submission will be ignored.
    message: '',
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    accessKey: 'you-access-key' // get your access key from https://www.staticforms.xyz
  });

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form'
      });
    }
  };
  return (
    <div>
      <div className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column' />
            <div className='column  is-two-thirds'>
              <div
                className={
                  response.type === 'success'
                    ? 'tile box notification is-primary'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={
                  response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={response.message !== '' ? 'is-hidden' : 'columns'}
              >
                <div className='column content'>
                  <h2>Contact Form</h2>
                  <form
                    action='https://api.staticforms.xyz/submit'
                    method='post'
                    onSubmit={handleSubmit}
                  >
                    <div className='field'>
                      <label className='label'>Your Name</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='Name'
                          name='name'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Your Email</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='email'
                          placeholder='Email'
                          name='email'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field' style={{ display: 'none' }}>
                      <label className='label'>Title</label>
                      <div className='control'>
                        <input
                          type='text'
                          name='honeypot'
                          style={{ display: 'none' }}
                          onChange={handleChange}
                        />
                        <input
                          type='hidden'
                          name='subject'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Message</label>
                      <div className='control'>
                        <textarea
                          className='textarea'
                          placeholder='Your Message'
                          name='message'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <button className='button is-primary' type='submit'>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='column' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
