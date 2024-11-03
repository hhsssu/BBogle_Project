import { useState } from 'react';
import ExStyles from '../Experience.module.css';
import ExCreateStyles from './ExCreate.module.css';
import BlueXIcon from '../../../assets/image/icon/BlueX.svg';
import YellowXIcon from '../../../assets/image/icon/YellowX.svg';

function ExCreate() {
  const Keywords = [
    { type: 0, name: '기술1' },
    { type: 0, name: '기술2' },
    { type: 0, name: '기술3' },
    { type: 1, name: '인성1' },
    { type: 1, name: '인성2' },
    { type: 1, name: '인성3' },
  ];
  const projects: string[] = ['RunnerWay', 'WON TOUCH!', 'SFD', 'Challet'];

  const [selectedOptions, setSelectedOptions] = useState<
    { type: number; name: string }[]
  >([]);

  // 선택할 때마다 키워드 추가
  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKeyword = Keywords.find(
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

  const deleteHandle = (option: string) => {
    setSelectedOptions(
      selectedOptions.filter((keyword) => keyword.name !== option),
    );
  };

  return (
    <>
      <section className={ExStyles.between}>
        <div
          className={`${ExStyles.center} ${ExStyles.title} ${ExCreateStyles.title}`}
        >
          경험 작성
        </div>
        <button className={`${ExStyles.regist} ${ExCreateStyles.regist}`}>
          등록하기
        </button>
      </section>

      {/* 작성하는 부분 */}
      <section className={ExCreateStyles.container}>
        {/* 제목 */}
        <div className={ExStyles.flex}>
          <p className={ExStyles.semibold}>제목</p>
          <span className={`${ExStyles.orange} ${ExStyles.semibold}`}>*</span>
        </div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className={ExCreateStyles.subtitle}
        />

        {/* 내용 */}
        <div className={ExStyles.flex}>
          <p className={ExStyles.semibold}>내용</p>
          <span className={`${ExStyles.orange} ${ExStyles.semibold}`}>*</span>
        </div>
        <textarea
          name="content"
          rows={20}
          placeholder="내용을 입력하세요"
          className={ExCreateStyles.content}
        />

        {/* 시작일 ~ 종료일 */}
        <div className={ExStyles.flex}>
          <p className={ExStyles.semibold}>경험 기간</p>
          <span className={`${ExStyles.orange} ${ExStyles.semibold}`}>*</span>
        </div>
        <div className={ExStyles.flex}>
          <div className={ExCreateStyles.margin}>
            <p className={ExCreateStyles.datedes}>시작일</p>
            <input type="date" className={ExCreateStyles.graybox} />
          </div>
          <div>
            <p className={ExCreateStyles.datedes}>종료일</p>
            <input type="date" className={ExCreateStyles.graybox} />
          </div>
        </div>

        {/* 경험 키워드 */}
        <p className={ExStyles.semibold}>관련 키워드</p>
        <div className={ExStyles.flex}>
          <select
            name="keywords"
            id="keywords"
            defaultValue=""
            onChange={handleSelectOption}
            className={ExCreateStyles.graybox}
          >
            <option value="" disabled>
              키워드를 선택하세요
            </option>
            <optgroup label="기술 키워드">
              {Keywords.filter((keyword) => keyword.type === 0).map(
                (keyword) => (
                  <option value={keyword.name} key={keyword.name}>
                    {keyword.name}
                  </option>
                ),
              )}
            </optgroup>
            <optgroup label="인성 키워드">
              {Keywords.filter((keyword) => keyword.type === 1).map(
                (keyword) => (
                  <option value={keyword.name} key={keyword.name}>
                    {keyword.name}
                  </option>
                ),
              )}
            </optgroup>
          </select>
          {/* 선택한 키워드 */}
          <div className={ExStyles.flex}>
            {selectedOptions.map((keyword, index) => (
              <div
                key={index}
                className={
                  keyword.type === 0
                    ? ExCreateStyles.bluekeyword
                    : ExCreateStyles.yellowkeyword
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
        <p className={ExStyles.semibold}>관련 프로젝트</p>
        <select
          name="projects"
          id="projects"
          defaultValue=""
          className={ExCreateStyles.graybox}
        >
          <option value="" disabled>
            프로젝트를 선택하세요
          </option>
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

export default ExCreate;
