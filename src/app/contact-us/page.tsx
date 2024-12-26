import { CONTACT } from "@/utils/constants";
import { Text, Title } from "@mantine/core";
import ContactHeader from "./components/Header";
import FAQSection from "../_sections/faq";
import { Form } from "@mantine/form";
import ContactForm from "./components/ContactForm";

import "./style.scss";
import InfoSection from "../_sections/info";

const ContactUsPage = () => {
  return (
    <>
      <div className="background">
        <ContactHeader />
      </div>
      <section className="safe-area mt-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="col-span-1">
            <FAQSection className="!mr-auto !font-medium" />
          </div>
          <div className="col-span-1 px-8 pb-8 pt-12">
            <ContactForm />
          </div>
        </div>
      </section>
      <InfoSection />
    </>
  );
};

export default ContactUsPage;
