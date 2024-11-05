import { useEffect, useState } from 'react';

import useKeywordStore from '../../../store/useKeywordStore';
import useActivityStore from '../../../store/useActivityStore';
// import useProjectStore from '../../../store/useProjectStore';
import { ActivityFormData } from '../../../store/useActivityStore';

import useBeforeUnload from '../../../hooks/useBeforeUnload';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BlueXIcon from '../../../assets/image/icon/BlueX.svg';
import YellowXIcon from '../../../assets/image/icon/YellowX.svg';

interface ActivityFormProps {
  activityId: number;
  onSubmit: (formData: ActivityFormData) => void;
}

function ActivityForm({ activityId, onSubmit }: ActivityFormProps) {
  // TODO 더미데이터 삭제
  //   const Keywords = [
  //     { type: 0, name: '기술1' },
  //     { type: 0, name: '기술2' },
  //     { type: 0, name: '기술3' },
  //     { type: 1, name: '인성1' },
  //     { type: 1, name: '인성2' },
  //     { type: 1, name: '인성3' },
  //   ];
  const projects = [
    { id: 1, name: 'RunnerWay' },
    { id: 2, name: 'WON TOUCH!' },
    { id: 3, name: 'SFD' },
    { id: 4, name: 'Challet' },
  ];

  const { activity, fetchActivityById } = useActivityStore();
  const { keywords, fetchKeywords } = useKeywordStore();
  //   TODO 프로젝트 API 가져오기
  //   const { projects, fetchProjects } = useProjectStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<
    { id: number; type: boolean; name: string }[]
  >([]);
  const [projectId, setProjectId] = useState<number | null>(null);
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
    fetchActivityById(activityId);
    fetchKeywords();
    // fetchProjects();
  }, [activityId]);

  // ✅입력이 변경된 상태에서 페이지 이탈 시 경고 알림
  const handleInputChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
      setIsWrite(true); // 입력이 변경될 때마다 isWrite 상태를 true로 설정
    };

  // ✅선택할 때마다 키워드 추가
  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKeyword = keywords.find(
      (keyword) => keyword.name === event.target.value,
    );
    if (
      selectedKeyword &&
      !selectedOptions.some((option) => option.name === selectedKeyword.name)
    ) {
      if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, selectedKeyword]);
        setIsWrite(true);
      } else {
        alert('키워드는 최대 3개까지 선택 가능합니다.');
      }
    }
  };

  // ✅키워드 삭제
  const deleteHandle = (option: string) => {
    setSelectedOptions(
      selectedOptions.filter((keyword) => keyword.name !== option),
    );
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

  // ✅폼 제출 로직
  const handleFormSubmit = () => {
    const formData: ActivityFormData = {
      activityId,
      title,
      content,
      startDate,
      endDate,
      selectedOptions,
      projectId,
    };

    onSubmit(formData); // 부모 컴포넌트로 데이터 전달
    setIsWrite(false); // 제출 후 경고 비활성화
  };

  return (
    <>
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
          value={!activity || activityId === 0 ? title : activity.title}
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
          value={!activity || activityId === 0 ? content : activity.content}
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
              value={
                !activity || activityId === 0 ? startDate : activity.startDate
              }
              onChange={handleInputChange(setStartDate)}
              className={ActivityCreateStyles.graybox}
            />
          </div>
          <div>
            <p className={ActivityCreateStyles.datedes}>종료일</p>
            <input
              type="date"
              value={!activity || activityId === 0 ? endDate : activity.endDate}
              onChange={handleInputChange(setEndDate)}
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
            onChange={handleSelectOption}
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
            {selectedOptions.map((keyword, index) => (
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
          value={projectId || ''}
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
    </>
  );
}

export default ActivityForm;
