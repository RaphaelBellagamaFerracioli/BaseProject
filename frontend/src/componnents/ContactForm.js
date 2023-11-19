import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./ContactForm.css"

const ContactForm = () => {
    const [form, setForm] = useState({ from_name: '', email: '', message: '' });
    const [feedback, setFeedback] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_yan5qbt', 'template_email', form, 'bR2q3ajw8ydtf_mR4')
            .then((result) => {
                console.log(result.text);
                setFeedback('Mensagem enviada com sucesso!');
                setForm({ from_name: '', email: '', message: '' }); // Limpa o formulário
            }, (error) => {
                console.log(error.text);
                setFeedback('Erro ao enviar a mensagem.');
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={sendEmail}>
            <h3><i>Envie aqui sua mensagem para nós</i></h3>
            <br/>
            <input type="text" name="from_name" value={form.from_name} onChange={handleChange} placeholder="Seu nome" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Seu email" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Sua mensagem"></textarea>
            <button type="submit">Enviar Mensagem</button>
            {feedback && <div className="feedback-message">{feedback}</div>}
        </form>
    );
};

export default ContactForm;
