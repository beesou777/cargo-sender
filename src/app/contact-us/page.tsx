import { CONTACT } from "@/utils/constants"
import { Text, Title } from "@mantine/core"
import ContactHeader from "./components/Header"
import FAQSection from "../_sections/faq"
import { Form } from "@mantine/form"
import ContactForm from "./components/ContactForm"

const ContactUsPage = () => {
    return (
        // <main className="safe-area mx-auto my-8">
        //     <article className="grid gap-8">
        //         <Title className="text-center">Contact Details</Title>
        //         <div className="grid gap-2 mb-8 bg-white p-8 rounded-lg">
        //             <Title order={3} className="mt-4">
        //                 Email
        //             </Title>
        //             <Text>
        //                 {CONTACT.EMAIL}
        //             </Text>
        //             <Title order={3} className="mt-4">
        //                 Phone
        //             </Title>
        //             <Text>{CONTACT.PHONE}</Text>
        //         </div>
        //     </article>
        // </main >
        <>
        <div className="bg-blue-700">
        <ContactHeader />
        </div>
        <section className="safe-area">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="col-span-1">
            <FAQSection />
            </div>
            <div className="col-span-1 p-8">
                <ContactForm/>
            </div>
        </div>
        </section>
        </>
    )
}

export default ContactUsPage


