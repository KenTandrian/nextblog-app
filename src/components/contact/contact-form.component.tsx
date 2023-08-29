import React, { useState, useEffect } from "react";

import classes from './contact-form.module.css';
import Notification from '../ui/notification.component';

const sendContactData = async (contactDetails: IContactDetail) => {
    const resp = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await resp.json();
    
    if (!resp.ok) { 
        throw new Error(data.message || 'Something went wrong!');
    }
}

const ContactForm = () => {
    const [ enteredEmail, setEnteredEmail ] = useState('');
    const [ enteredName, setEnteredName ] = useState('');
    const [ enteredMessage, setEnteredMessage ] = useState('');

    const [ requestStatus, setRequestStatus ] = useState<string>(); // 'pending', 'success', 'error'
    const [ requestError, setRequestError ] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const sendMessageHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // We can also add client-side validation here

        setRequestStatus('pending');
        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            });
            setRequestStatus('success');
            setEnteredEmail('');
            setEnteredName('');
            setEnteredMessage('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification: INotification;
    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error :(',
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" required value={enteredEmail} onChange={event => setEnteredEmail(event.target.value)} />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required value={enteredName} onChange={event => setEnteredName(event.target.value)}/>
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                        name="message" id="message" rows={5}
                        value={enteredMessage} required
                        onChange={event => setEnteredMessage(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>

                { notification && (
                    <Notification 
                        status={notification.status} 
                        title={notification.title} 
                        message={notification.message} 
                    />
                )}
            </form>
        </section>
    );
}

export default ContactForm;