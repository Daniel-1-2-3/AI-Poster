import { useEffect, useState } from 'react'
import JobListing from './JobListing'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

const JobListings = ( {isHome = true} ) => { 
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchJobs = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                isHome ? setJobs(data.slice(-3)) : setJobs(data)
            } catch (e) {
                console.log(`Error Fetching Data ${e}`)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs();
    }, []) 
    
    const recentJobs = isHome ? jobs.slice(0,3) : jobs;
    return (
        <section className ="bg-blue-50 px-4 py-10">
            <div className ="container-xl lg:container m-auto">
                <h2 className ="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                
                { loading ? <Spinner loading={loading}/> : 
                    <div className ="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentJobs.map((job, index) => ( //iterate through jobs 0-2 or 0-5
                            <JobListing key={index} job={job}></JobListing>
                        ))} 
                    </div>
                }
            </div>
        </section>
    )
}

JobListings.propTypes = {
    isHome: PropTypes.bool.isRequired,
};


export default JobListings
