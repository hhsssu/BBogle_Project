import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ProjectCreate.module.css';

import AddTag from '../../../assets/image/icon/AddTag.svg';
import ToggleOn from '../../../assets/image/icon/ToggleOn.svg';
import ToggleOff from '../../../assets/image/icon/ToggleOff.svg';

function ProjectCreate() {
  const navigate = useNavigate();

  const navMain = () => {
    navigate('/main');
  };

  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState('');

  const [teammate, setTeammate] = useState(1);

  const [roles, setRoles] = useState<string[]>([]);
  const [techs, setTechs] = useState<string[]>([]);

  const [roleInputOpen, setRoleInputOpen] = useState(false);
  const [techInputOpen, setTechInputOpen] = useState(false);

  const [roleInput, setRoleInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const roleInputRef = useRef<HTMLInputElement>(null);
  const techInputRef = useRef<HTMLInputElement>(null);

  const [toggleOn, setToggleOn] = useState(false);

  const handleImgClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // 새 이미지 URL 생성
      setImgSrc(newImageUrl); // 이미지 상태 업데이트
    }
  };

  const handleTeammate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      setTeammate(Number(event.target.value));
    }
  };

  const openRoleInput = () => {
    setRoleInputOpen(true);
  };

  const openTechInput = () => {
    setTechInputOpen(true);
  };

  const handleRoleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInput(event.target.value);
  };

  const handleTechInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechInput(event.target.value);
  };

  const addRole = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setRoles([...roles, roleInput]);
      setRoleInput('');
      setRoleInputOpen(false);
    } else if (event.key === 'Escape') {
      setRoleInput('');
      setRoleInputOpen(false);
    }
  };

  const addTech = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTechs([...techs, techInput]);
      setTechInput('');
      setRoleInputOpen(false);
    } else if (event.key === 'Escape') {
      setTechInput('');
      setTechInputOpen(false);
    }
  };

  const handleToggleState = () => {
    setToggleOn(!toggleOn);
  };

  useEffect(() => {
    if (roleInputRef.current) {
      roleInputRef.current.focus();
    }
  }, [roleInputOpen]);

  useEffect(() => {
    if (techInputRef.current) {
      techInputRef.current.focus();
    }
  }, [techInputOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        roleInputRef.current &&
        !roleInputRef.current.contains(event.target as Node)
      ) {
        setRoleInput('');
        setRoleInputOpen(false);
      }
      if (
        techInputRef.current &&
        !techInputRef.current.contains(event.target as Node)
      ) {
        setTechInput('');
        setTechInputOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.back} onClick={navMain}>
        돌아가기
      </div>

      <span className={style.head}>프로젝트 생성</span>

      <div className={style.inputLabel}>
        <p className={style.label}>
          <span>대표이미지/프로젝트명 </span>
          <span className={style.essential}>*</span>
        </p>
        <img
          className={style.img}
          src={imgSrc}
          alt="로고"
          onClick={handleImgClick}
        />
        <input
          className={style.hiddenInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imgInputRef}
        />
        <input
          className={style.titleInput}
          type="text"
          placeholder="프로젝트 이름을 입력해주세요 ! (20자 이내)"
        />
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>프로젝트 개요</span>
        <textarea className={style.summary} rows={3}></textarea>
      </div>

      <div className={style.inputLabel}>
        <p className={style.label}>
          <span>프로젝트 기간</span>
          <span className={style.essential}>*</span>
        </p>
        <div className={style.term}>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>시작일</p>
            <input className={style.datePicker} type="date" />
          </div>
          <span className={style.separator}>~</span>
          <div className={style.dateWrapper}>
            <p className={style.dateLabel}>종료일</p>
            <input className={style.datePicker} type="date" />
          </div>
        </div>
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>프로젝트 인원</span>
        <select
          className={style.select}
          value={teammate}
          onChange={handleTeammate}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        명
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>나의 역할</span>
        {roles.map((role, index) => (
          <div key={index} className={style.tag}>
            {role}
          </div>
        ))}

        {roleInputOpen ? (
          <input
            className={style.tagInput}
            type="text"
            ref={roleInputRef}
            value={roleInput}
            onChange={handleRoleInput}
            onKeyDown={addRole}
          />
        ) : (
          ''
        )}

        <img
          className={style.addTag}
          src={AddTag}
          alt="태그 추가"
          onClick={openRoleInput}
        />
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>사용 기술</span>
        {techs.map((tech, index) => (
          <div key={index} className={style.tag}>
            {tech}
          </div>
        ))}

        {techInputOpen ? (
          <input
            className={style.tagInput}
            type="text"
            ref={techInputRef}
            value={techInput}
            onChange={handleTechInput}
            onKeyDown={addTech}
          />
        ) : (
          ''
        )}

        <img
          className={style.addTag}
          src={AddTag}
          alt="태그 추가"
          onClick={openTechInput}
        />
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>알림 설정</span>
        {toggleOn ? (
          <img
            className={style.toggle}
            src={ToggleOn}
            onClick={handleToggleState}
          />
        ) : (
          <img
            className={style.toggle}
            src={ToggleOff}
            onClick={handleToggleState}
          />
        )}

        {toggleOn ? (
          <div>
            <input className={style.timeInput} type="time" />
          </div>
        ) : (
          <div className={style.timeToggleOff}>
            <span>오후</span>
            <span>05:30</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCreate;
