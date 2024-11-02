import { Route, Routes } from 'react-router-dom';

import DiaryCreate from '../components/diary/diaryCreate/DiaryCreate';

function DiaryPage() {
  return (
    <div>
      <Routes>
        <Route path="create" element={<DiaryCreate></DiaryCreate>} />
      </Routes>
    </div>
  );
}

export default DiaryPage;
