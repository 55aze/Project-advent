import { AdventCalendar } from './components/AdventCalendar';
import updatesData from './data/updates.json';
import type { UpdatesData } from './types/update';

function App() {
  return <AdventCalendar data={updatesData as UpdatesData} />;
}

export default App;
