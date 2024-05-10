import { ContactPresentation } from "./components/ContactPresentation";
import { ContactForm } from "./components/ContactForm";
import { CustomFormSlide } from "../../components/CustomFormSlide";

export const ContactUsPage = () => {
  const steps = [<ContactPresentation />, <ContactForm />];
  return (
    <div className="container-page">
      <CustomFormSlide steps={steps} />
    </div>
  )
}