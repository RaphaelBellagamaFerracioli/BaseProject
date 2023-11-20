import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./ContactForm.css"

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_yan5qbt', 'template_email', form.current, 'bR2q3ajw8ydtf_mR4')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
 

    return (
        <form ref={form} onSubmit={sendEmail}>
            <h3><i>Envie aqui sua mensagem para nós</i></h3>
   
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>

      
    );
};

export default ContactForm;
