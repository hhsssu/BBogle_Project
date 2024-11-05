import { Route, Routes } from 'react-router-dom';
import ActivityList from '../components/experience/ActivityList';
import ActivityDetail from '../components/experience/activityDetail/ActivityDetail';
import ActivityCreate from '../components/experience/activityCreateUpdate/ActivityCreate';

import ActivityStyles from '../components/experience/Activity.module.css';
import ActivityUpdate from '../components/experience/activityCreateUpdate/ActivityUpdate';

function ActivityPage() {
  return (
    <div className={ActivityStyles.container}>
      <Routes>
        <Route path="" element={<ActivityList />} />
        <Route path="create" element={<ActivityCreate />} />
        <Route path=":activityId" element={<ActivityDetail />} />
        <Route path="update/:activityId" element={<ActivityUpdate />} />
      </Routes>
    </div>
  );
}

export default ActivityPage;
