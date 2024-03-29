import React, { Fragment } from "react";
import Head from "next/head";

import ContactForm from "@/components/contact/contact-form.component";

const ContactPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Contact Me</title>
                <meta name="description" content="Send me your messages"/>
            </Head>
            <ContactForm />
        </Fragment>
    )
}

export default ContactPage;