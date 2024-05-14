export const JobsAvailable = () => {
    return (
        <div className="background-secondary flex max-md:flex-col items-center justify-center min-h-screen">

            <div className="md:w-2/4 text-center mx-4 md:mx-8 my-8 md:order-2">
                <h1>
                    Empleos en Phentta
                </h1>
                <h2>
                    Lamentablemente, en este momento no estamos contratando. ¡Gracias por tu interés en formar parte de nuestro equipo!
                </h2>
            </div>
            <div className="w-3/12 p-4 md:order-1">
                <img src="/assets/images/jobs/jobLess.svg" />
            </div>

        </div>
    )
}
