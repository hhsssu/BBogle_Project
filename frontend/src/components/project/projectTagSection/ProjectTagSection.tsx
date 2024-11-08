import style from './ProjectTagSection.module.css';

import AddTag from '../../../assets/image/icon/AddTag.svg';
import Close from '../../../assets/image/icon/Close.svg';
import EnterIcon from '../../../assets/image/icon/Enter.svg';

import { useState, useRef, useEffect } from 'react';
import useProjectStore from '../../../store/useProjectStore';

function ProjectTagSection() {
  const project = useProjectStore((state) => state.project);
  const updateProject = useProjectStore((state) => state.updateProjectField);

  const [roleInputOpen, setRoleInputOpen] = useState(false);
  const [techInputOpen, setTechInputOpen] = useState(false);

  const [roleInput, setRoleInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const roleInputRef = useRef<HTMLInputElement>(null);
  const techInputRef = useRef<HTMLInputElement>(null);

  const openRoleInput = () => {
    if (!roleInputOpen) setRoleInputOpen(true);
  };

  const openTechInput = () => {
    if (!techInputOpen) setTechInputOpen(true);
  };

  const handleRoleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInput(event.target.value);
  };

  const handleTechInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechInput(event.target.value);
  };

  const addRole = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement>,
  ) => {
    if ('key' in event) {
      if (event.key !== 'Enter') {
        if (event.key === 'Escape') {
          setRoleInput('');
          setRoleInputOpen(false);
        }
        return;
      }
    }

    if (roleInput === '') {
      setRoleInputOpen(false);
      return;
    }

    updateProject('roles', [...project.roles, roleInput]);
    setRoleInput('');
    setRoleInputOpen(false);
  };

  const addTech = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement>,
  ) => {
    if ('key' in event) {
      if (event.key !== 'Enter') {
        if (event.key === 'Escape') {
          setTechInput('');
          setTechInputOpen(false);
        }
        return;
      }
    }

    if (techInput === '') {
      setRoleInputOpen(false);
      return;
    }

    setTechInput('');
    setTechInputOpen(false);
    updateProject('techs', [...project.techs, techInput]);
  };

  const deleteRoleTag = (index: number) => {
    updateProject(
      'roles',
      project.roles.filter((_, i) => i !== index),
    );
  };

  const deleteTechTag = (index: number) => {
    updateProject(
      'techs',
      project.techs.filter((_, i) => i !== index),
    );
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
        roleInputOpen &&
        roleInputRef.current &&
        !roleInputRef.current.contains(event.target as Node)
      ) {
        setRoleInput('');
        setRoleInputOpen(false);
      }
      if (
        techInputOpen &&
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
      <div className={style.inputLabel}>
        <span className={style.label}>나의 역할</span>
        <div className={style.tagSection}>
          {project.roles.map((role, index) => (
            <div key={index} className={style.tag}>
              {role}
              <img
                className={style.close}
                src={Close}
                alt="닫기"
                onClick={() => {
                  deleteRoleTag(index);
                }}
              />
            </div>
          ))}

          {roleInputOpen && (
            <div ref={roleInputRef} className={style.tagInputContainer}>
              <input
                className={style.tagInput}
                type="text"
                maxLength={20}
                value={roleInput}
                onChange={handleRoleInput}
                onKeyDown={addRole}
              />
              <img
                className={style.enterImg}
                src={EnterIcon}
                alt="등록"
                onClick={addRole}
              />
            </div>
          )}

          {project.roles.length < 7 && (
            <img
              className={style.addTag}
              src={AddTag}
              alt="태그 추가"
              onClick={openRoleInput}
            />
          )}
        </div>
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>사용 기술</span>
        <div className={style.tagSection}>
          {project.techs.map((tech, index) => (
            <div key={index} className={style.tag}>
              {tech}
              <img
                className={style.close}
                src={Close}
                alt="삭제"
                onClick={() => {
                  deleteTechTag(index);
                }}
              />
            </div>
          ))}

          {techInputOpen ? (
            <div ref={techInputRef} className={style.tagInputContainer}>
              <input
                className={style.tagInput}
                type="text"
                maxLength={20}
                value={techInput}
                onChange={handleTechInput}
                onKeyDown={addTech}
              />
              <img src={EnterIcon} alt="등록" onClick={addTech} />
            </div>
          ) : (
            ''
          )}

          {project.techs.length < 7 && (
            <img
              className={style.addTag}
              src={AddTag}
              alt="태그 추가"
              onClick={openTechInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectTagSection;
