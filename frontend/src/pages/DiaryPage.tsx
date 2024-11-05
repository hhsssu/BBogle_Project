import { Route, Routes } from 'react-router-dom';

import DiaryCreate from '../components/diary/diaryCreate/DiaryCreate';
import DiaryDetail from '../components/diary/diaryDetail/DiaryDetail';

function DiaryPage() {
  return (
    <div>
      <Routes>
        <Route path="create" element={<DiaryCreate></DiaryCreate>} />
        <Route path=":diaryId" element={<DiaryDetail></DiaryDetail>} />
      </Routes>
    </div>
  );
}

export default DiaryPage;
