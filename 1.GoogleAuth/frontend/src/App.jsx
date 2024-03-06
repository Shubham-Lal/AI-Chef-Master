
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
// import CareerPage from './pages/CareerPage'
import './App.css'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'
import JobsPage from './pages/JobsPage'
import JobDataPage from './pages/JobDataPage'
// import JobOpening from './pages/JobOpening'
import JobForm from './components/JobForm'
import ApplicationPage from './components/ApplicationPage'
import Page from "../src/resume-parser/page"
import InstructionsPage from "./pages/InstructionsPage"
import HistoryPage from "./pages/HistoryPage"
import SearchPage from "./pages/SearchPage"
import { Toaster } from "react-hot-toast"

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={user ? <DashboardPage /> : <Navigate to='/login' />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/signup' element={<SignupPage />} />
            {/* <Route path='/career' element={<CareerPage/>}/> */}
            <Route path='/jobs' element={!user ? <JobsPage /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/dashboard' />} />
            <Route path='/reset' element={!user ? <LoginPage /> : <Navigate to='/reset' />} />
            <Route path='/jobform' element={!user ? <JobForm /> : <Navigate to='/login' />} />
            <Route path='/jobapplication' element={!user ? <JobDataPage /> : <Navigate to='/login' />} />
            <Route path='/jobopenings' element={!user ? <ApplicationPage /> : <Navigate to='/login' />} />
            <Route path='/resume-parser' element={!user ? <Page /> : <Navigate to='/login' />} />
            <Route path='/dashboard/instruction' element={<InstructionsPage />} />
            <Route path='/history' element={!user ? <SignupPage /> : <HistoryPage />} />
            <Route path='/search' element={!user ? <SignupPage /> : <SearchPage />} />
          </Routes>
        </div>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App