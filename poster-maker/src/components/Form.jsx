import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const Form = ({formType, addJobSubmit=null, updateJobSubmit=null, jobId=null, defaultTitle, defaultType, defaultLocation, defaultDescription, defaultSalary, defaultCompanyName, defaultCompanyDescription, defaultContactEmail, defaultContactPhone}) => {
    //forms in JSX
    const [title, setTitle] = useState(defaultTitle);
    const [type, setType] = useState(defaultType);
    const [location, setLocation] = useState(defaultLocation);
    const [description, setDescription] = useState(defaultDescription);
    const [salary, setSalary] = useState(defaultSalary);
    const [companyName, setCompanyName] = useState(defaultCompanyName);
    const [companyDescription, setCompanyDescription] = useState(defaultCompanyDescription);
    const [contactEmail, setContactEmail] = useState(defaultContactEmail);
    const [contactPhone, setContactPhone] = useState(defaultContactPhone);

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault(); //prevents default action of simply reloading and clearing the page

        const newJob = {
            title: title,
            type: type,
            location: location,
            description: description,
            salary: salary,
            company: {
                name: companyName,
                description: companyDescription,
                contactEmail: contactEmail,
                contactPhone: contactPhone,
            },
        }   
        formType == 'editJob' ? updateJobSubmit(newJob, jobId) : addJobSubmit(newJob);
        formType=='addJob' ? toast.success(`Job added: ${newJob.title}`) : toast.success(`Job updated: ${newJob.title}`)
        return formType == 'addJob' ? navigate('/jobs') : navigate(`/jobs/${jobId}`)//redirect to /jobs page
    }

    return (
    <>
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form>
                        <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Job Type</label>
                            <select
                                id="type"
                                name="type"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Enter Country
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="eg. Senior Web Developer"
                                required
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-gray-700 font-bold mb-2"
                            >
                            Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                                Salary
                            </label>
                            <select
                                id="salary"
                                name="salary"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={salary}
                                onChange={(event) => setSalary(event.target.value)}
                            >
                                <option value="Under $50K">Under $50K</option>
                                <option value="$50K - 60K">$50K - $60K</option>
                                <option value="$60K - 70K">$60K - $70K</option>
                                <option value="$70K - 80K">$70K - $80K</option>
                                <option value="$80K - 90K">$80K - $90K</option>
                                <option value="$90K - 100K">$90K - $100K</option>
                                <option value="$100K - 125K">$100K - $125K</option>
                                <option value="$125K - 150K">$125K - $150K</option>
                                <option value="$150K - 175K">$150K - $175K</option>
                                <option value="$175K - 200K">$175K - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Location
                            </label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Company Location'
                                required           
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />
                        </div>

                        <h3 className="text-2xl mb-5">Company Info</h3>

                        <div className="mb-4">
                            <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="company_description"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Company Description
                            </label>
                            <textarea
                                id="company_description"
                                name="company_description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="What does your company do?"
                                value={companyDescription}
                                onChange={(event) => setCompanyDescription(event.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="contact_email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Contact Email
                            </label>
                            <input
                                type="email"
                                id="contact_email"
                                name="contact_email"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Email address for applicants"
                                required
                                value={contactEmail}
                                onChange={(event) => setContactEmail(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="contact_phone"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                id="contact_phone"
                                name="contact_phone"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants"
                                value={contactPhone}
                                onChange={(event) => setContactPhone(event.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {formType == 'addJob' ? 'Add Job' : 'Update Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

Form.propTypes = {
    formType: PropTypes.number.isRequired,
    addJobSubmit: PropTypes.func.isRequired,
    updateJobSubmit: PropTypes.func.isRequired,
    jobId: PropTypes.string.isRequired,
    defaultTitle: PropTypes.string.isRequired,
    defaultType: PropTypes.string.isRequired,
    defaultLocation: PropTypes.string.isRequired,
    defaultDescription: PropTypes.string.isRequired,
    defaultSalary: PropTypes.string.isRequired,
    defaultCompanyName: PropTypes.string.isRequired,
    defaultCompanyDescription: PropTypes.string.isRequired,
    defaultContactEmail: PropTypes.string.isRequired,
    defaultContactPhone: PropTypes.string.isRequired,
}

export default Form
