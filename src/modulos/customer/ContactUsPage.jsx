import { ContactPresentation } from "./components/ContactPresentation";
import { ContactForm } from "./components/ContactForm";
import { CustomFormSlide } from "../../components/CustomFormSlide";
import { useEffect } from "react";

export const ContactUsPage = () => {
  const steps = [<ContactPresentation />, <ContactForm />];

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [])
  return (
    <div className="container-page">
      <CustomFormSlide steps={steps} />
    </div>
  )
}