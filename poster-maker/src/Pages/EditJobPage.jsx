import { useLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types'
import Form from '../components/Form'


const EditJobPage = ({updateJobSubmit}) => {
    const job = useLoaderData()
    return (
        <Form
            formType='editJob'
            updateJobSubmit={updateJobSubmit}
            jobId={job.id}
            defaultTitle={job.title}
            defaultType={job.type}
            defaultLocation={job.location}
            defaultDescription={job.description}
            defaultSalary={job.salary}
            defaultCompanyName={job.company.name}
            defaultCompanyDescription={job.company.description}
            defaultContactEmail={job.company.contactEmail}
            defaultContactPhone={job.company.contactPhone}
        />
    )
}

EditJobPage.propTypes = {
    updateJobSubmit: PropTypes.func.isRequired
}

export default EditJobPage
