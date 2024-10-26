import { CONTACT } from "@/utils/constants"
import { Text, Title } from "@mantine/core"

const ContactUsPage = () => {
    return (
        <main className="safe-area mx-auto my-8">
            <article className="grid gap-8">
                <Title className="text-center">Contact Details</Title>
                <div className="grid gap-2 mb-8 bg-white p-8 rounded-lg">
                    <Title order={3} className="mt-4">
                        Email
                    </Title>
                    <Text>
                        {CONTACT.EMAIL}
                    </Text>
                    <Title order={3} className="mt-4">
                        Phone
                    </Title>
                    <Text>{CONTACT.PHONE}</Text>
                </div>
            </article>
        </main >
    )
}

export default ContactUsPage


