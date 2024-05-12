import { CustomFormSlide } from "../../components/CustomFormSlide";
import { JobsForm } from "./components/JobsForm";
import { JobsPresentation } from "./components/JobsPresentation";

export const JobsPage = () => {
    const steps = [<JobsPresentation />, <JobsForm />];
    return (
        <div className="container-page">
           <CustomFormSlide steps={steps} />
        </div>
    )
}
