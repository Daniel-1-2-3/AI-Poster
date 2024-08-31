import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import JobsPage from './Pages/JobsPage'
import AddJobPage from './Pages/AddJobPage'
import EditJobPage from './Pages/EditJobPage';
import JobPage, { jobLoader } from './Pages/JobPage'
import NotFound from './Pages/NotFound'
import MainLayout from './Layouts/MainLayout';

const App = () => {
  //add new job
  const addJobSubmit = async (newJob) => {
    await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const updateJobSubmit = async (job, jobId) => {
    await fetch(`/api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  //delete a job
  const deleteJob = async (jobId) => {
    await fetch (`/api/jobs/${jobId}`, {
      method: 'DELETE'
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJobSubmit} />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/jobs/edit/:id' element={<EditJobPage updateJobSubmit={updateJobSubmit}/>} loader={jobLoader} />
        <Route path='*' element={<NotFound />} />

      </Route>
    )
  );  

  return <RouterProvider router={router}/>
}

export default App
