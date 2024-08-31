import Form from '../components/Form'
import PropTypes from 'prop-types'

const AddJobPage = ({addJobSubmit}) => {
    return (
        <Form 
            formType='addJob'
            addJobSubmit={addJobSubmit}
            defaultTitle=''
            defaultType='Full-Time'
            defaultLocation=''
            defaultDescription=''
            defaultSalary='Under $50K'
            defaultCompanyName=''
            defaultCompanyDescription=''
            defaultContactEmail=''
            defaultContactPhone=''
        />
    )
}

AddJobPage.propTypes = {
    addJobSubmit: PropTypes.func.isRequired,
}

export default AddJobPage
