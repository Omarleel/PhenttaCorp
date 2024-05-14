import { CustomFormSlide } from "../../components/CustomFormSlide";
import { JobsAvailable } from "./components/JobsAvailable";
import { JobsForm } from "./components/JobsForm";
import { JobsPresentation } from "./components/JobsPresentation";

export const JobsPage = () => {
    const steps = [<JobsPresentation />, <JobsAvailable />, /*<JobsForm />*/];
    return (
        <div className="container-page">
           <CustomFormSlide steps={steps} />
        </div>
    )
}
