
import './App.css'

import Task from './components/Task'

function App() {

  return (
    <>
      <div>
        <Task data={{ 'usa': 'new york', 'germany': 'berlin', 'india': 'new delhi', 'uk': 'london' }} />
      </div>  
    </>
  )
}

export default App
