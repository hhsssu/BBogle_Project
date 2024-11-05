import { useEffect, useState } from 'react';

import ActivityStyles from '../Activity.module.css';
import ActivityCreateStyles from './ActivityCreate.module.css';

import BlueXIcon from '../../../assets/image/icon/BlueX.svg';
import YellowXIcon from '../../../assets/image/icon/YellowX.svg';

import useKeywordStore from '../../../store/useKeywordStore';
import useActivityStore from '../../../store/useActivityStore';
// import useProjectStore from '../../../store/useProjectStore';

interface ActivityFormProps {
  activityId: number;
}

function ActivityForm({ activityId }: ActivityFormProps) {
  // TODO 더미데이터 삭제
  //   const Keywords = [
  //     { type: 0, name: '기술1' },
  //     { type: 0, name: '기술2' },
  //     { type: 0, name: '기술3' },
  //     { type: 1, name: '인성1' },
  //     { type: 1, name: '인성2' },
  //     { type: 1, name: '인성3' },
  //   ];
  const projects: string[] = ['RunnerWay', 'WON TOUCH!', 'SFD', 'Challet'];

  const { activity, fetchActivityById } = useActivityStore();
  const { keywords, fetchKeywords } = useKeywordStore();
  //   TODO 프로젝트 API 가져오기
  //   const { projects, fetchProjects } = useProjectStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<
    { type: number; name: string }[]
  >([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    fetchActivityById(activityId);
    fetchKeywords();
    // fetchProjects();
  }, [activityId]);

  // TODO 작성 수정 이탈 시 경고 알림

  // 선택할 때마다 키워드 추가
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
      } else {
        alert('키워드는 최대 3개까지 선택 가능합니다.');
      }
    }
  };

  // 키워드 삭제
  const deleteHandle = (option: string) => {
    setSelectedOptions(
      selectedOptions.filter((keyword) => keyword.name !== option),
    );
  };

  // 내용 700자 제한
  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const maxLength = 700;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }

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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setContent(e.target.value)}
          className={ActivityCreateStyles.content}
          onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleTextareaChange(event)
          }
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
              onChange={(e) => setStartDate(e.target.value)}
              className={ActivityCreateStyles.graybox}
            />
          </div>
          <div>
            <p className={ActivityCreateStyles.datedes}>종료일</p>
            <input
              type="date"
              value={!activity || activityId === 0 ? endDate : activity.endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
                .filter((keyword) => keyword.type === 0)
                .map((keyword) => (
                  <option value={keyword.name} key={keyword.name}>
                    {keyword.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="인성 키워드">
              {keywords
                .filter((keyword) => keyword.type === 1)
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
                  keyword.type === 0
                    ? ActivityCreateStyles.bluekeyword
                    : ActivityCreateStyles.yellowkeyword
                }
              >
                {keyword.name}
                <img
                  src={keyword.type === 0 ? BlueXIcon : YellowXIcon}
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
          defaultValue={
            !activity || activityId === 0 ? projectName : activity.projectTitle
          }
          onChange={(e) => setProjectName(e.target.value)}
          className={ActivityCreateStyles.graybox}
        >
          <option value="">선택 안함</option>
          {projects.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </section>
    </>
  );
}

export default ActivityForm;
