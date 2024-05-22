import { Routes, Route } from 'react-router-dom'
import States from './States';
import Dishes from './Dishes';

function IndianStates() {
  return (
    <Routes>
      <Route path='/' element={<States />} />
      <Route path='/:stateName' element={<Dishes />} />
    </Routes>
  );
}

export default IndianStates;
