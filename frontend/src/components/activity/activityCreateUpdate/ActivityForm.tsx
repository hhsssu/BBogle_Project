import { useEffect, useState } from 'react';

import useActivityKeywordStore from '../../../store/useActivityKeywordStore';
// import useProjectStore from '../../../store/useProjectStore';
// import { ActivityFormData } from '../../../store/useActivityStore';

import useBeforeUnload from '../../../hooks/useBeforeUnload';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BlueXIcon from '../../../assets/image/icon/BlueX.svg';
import YellowXIcon from '../../../assets/image/icon/YellowX.svg';

interface ActivityFormProps {
  activityId?: number; // 작성 페이지에서는 받을 필요 없음
  onSubmit: (event: React.FormEvent) => void;
  initialValues: {
    title: string;
    content: string;
    startDate: Date | null;
    endDate: Date | null;
    projectId: number | null;
    keywords: { id: number; type: boolean; name: string }[];
  };
}

function ActivityForm({ onSubmit, initialValues }: ActivityFormProps) {
  // TODO 프로젝트 API 가져오기
  // const { projects, fetchProjects } = useProjectStore();

  // 경험 키워드 목록 가져오기
  const { activityKeywords, fetchActivityKeywords } = useActivityKeywordStore();

  // TODO 프로젝트 더미데이터 삭제
  const projects = [
    { id: 1, name: 'RunnerWay' },
    { id: 2, name: 'WON TOUCH!' },
    { id: 3, name: 'SFD' },
    { id: 4, name: 'Challet' },
  ];
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [endDate, setEndDate] = useState(initialValues.endDate);
  const [projectId, setProjectId] = useState(initialValues.projectId);
  const [keywords, setKeywords] = useState(initialValues.keywords);
  // const [projectTitle, setProjectTitle] = useState('');

  // 페이지 이탈 방지 경고 설정
  const [isWrite, setIsWrite] = useState(false);

  // 페이지를 떠나기 전에 경고 메시지 표시
  useBeforeUnload(
    isWrite
      ? '페이지를 떠나면 저장되지 않은 내용이 있습니다. 계속하시겠습니까?'
      : null,
  );

  // ✅데이터 불러오기
  useEffect(() => {
    fetchActivityKeywords();
    // fetchProjects();
  }, [initialValues]);

  // ✅입력이 변경된 상태에서 페이지 이탈 시 경고 알림
  const handleInputChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
      setIsWrite(true); // 입력이 변경될 때마다 isWrite 상태를 true로 설정
    };

  // ✅선택할 때마다 키워드 추가
  const handleSelectKeyword = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKeyword = activityKeywords.find(
      (keyword) => keyword.name === event.target.value,
    );
    if (
      selectedKeyword &&
      !keywords.some((option) => option.name === selectedKeyword.name)
    ) {
      if (keywords.length < 3) {
        setKeywords([...keywords, selectedKeyword]);
        setIsWrite(true);
      } else {
        alert('키워드는 최대 3개까지 선택 가능합니다.');
      }
    }
  };

  // ✅키워드 삭제
  const deleteHandle = (option: string) => {
    setKeywords(keywords.filter((keyword) => keyword.name !== option));
    setIsWrite(true);
  };

  // ✅내용 700자 제한
  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const maxLength = 700;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }

  // ✅프로젝트 ID & Title
  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value); // value는 project ID
    setProjectId(selectedId);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 수정 / 작성하는 부분 */}
      <section className={ActivityCreateStyles.container}>
        {/* 제목 */}
        <div className={ActivityStyles.flex}>
          <p className={ActivityStyles.semibold}>제목</p>
          <span
            className={`${ActivityStyles.orange} ${ActivityStyles.semibold}`}
          >
            *
          </span>
        </div>
        <input
          type="text"
          maxLength={20}
          placeholder="제목을 입력하세요 (최대 20자)"
          value={title}
          onChange={handleInputChange(setTitle)}
          className={ActivityCreateStyles.subtitle}
        />

        {/* 내용 */}
        <div className={ActivityStyles.flex}>
          <p className={ActivityStyles.semibold}>내용</p>
          <span
            className={`${ActivityStyles.orange} ${ActivityStyles.semibold}`}
          >
            *
          </span>
        </div>
        <textarea
          name="content"
          rows={10}
          placeholder="내용을 입력하세요 (최대 700자)"
          value={content}
          onChange={handleInputChange(setContent)}
          className={ActivityCreateStyles.content}
          onInput={handleTextareaChange}
        />

        {/* TODO 프로젝트 작성과 디자인 통일하기 */}
        {/* 시작일 ~ 종료일 */}
        <div className={ActivityStyles.flex}>
          <p className={ActivityStyles.semibold}>경험 기간</p>
          <span
            className={`${ActivityStyles.orange} ${ActivityStyles.semibold}`}
          >
            *
          </span>
        </div>
        <div className={ActivityStyles.flex}>
          <div className={ActivityCreateStyles.margin}>
            <p className={ActivityCreateStyles.datedes}>시작일</p>
            <input
              type="date"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setStartDate(e.target.value ? new Date(e.target.value) : null)
              }
              className={ActivityCreateStyles.graybox}
            />
          </div>
          <div>
            <p className={ActivityCreateStyles.datedes}>종료일</p>
            <input
              type="date"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setEndDate(e.target.value ? new Date(e.target.value) : null)
              }
              className={ActivityCreateStyles.graybox}
            />
          </div>
        </div>

        {/* 경험 키워드 */}
        <p className={ActivityStyles.semibold}>관련 키워드</p>
        <div className={ActivityStyles.flex}>
          <select
            name="keywords"
            id="keywords"
            defaultValue=""
            onChange={handleSelectKeyword}
            className={ActivityCreateStyles.graybox}
          >
            <option value="" disabled>
              키워드를 선택하세요
            </option>
            <optgroup label="기술 키워드">
              {keywords
                .filter((keyword) => !keyword.type)
                .map((keyword) => (
                  <option value={keyword.name} key={keyword.name}>
                    {keyword.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="인성 키워드">
              {keywords
                .filter((keyword) => !keyword.type)
                .map((keyword) => (
                  <option value={keyword.name} key={keyword.name}>
                    {keyword.name}
                  </option>
                ))}
            </optgroup>
          </select>
          {/* 선택한 키워드 */}
          <div className={ActivityStyles.flex}>
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className={
                  !keyword.type
                    ? ActivityCreateStyles.bluekeyword
                    : ActivityCreateStyles.yellowkeyword
                }
              >
                {keyword.name}
                <img
                  src={!keyword.type ? BlueXIcon : YellowXIcon}
                  alt="키워드 삭제"
                  onClick={() => deleteHandle(keyword.name)}
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 관련 프로젝트 */}
        <p className={ActivityStyles.semibold}>관련 프로젝트</p>
        <select
          name="projects"
          id="projects"
          // null이면 undefined로 변환
          value={projectId ?? undefined}
          onChange={handleProjectChange}
          className={ActivityCreateStyles.graybox}
        >
          <option value="">선택 안함</option>
          {projects.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </section>
    </form>
  );
}

export default ActivityForm;
