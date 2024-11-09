import style from './ProjectTagInput.module.css';

import AddTag from '../../../../../assets/image/icon/AddTag.svg';
import Close from '../../../../../assets/image/icon/Close.svg';
import EnterIcon from '../../../../../assets/image/icon/Enter.svg';

import { useState, useRef, useEffect } from 'react';
import useProjectStore from '../../../../../store/useProjectStore';

function ProjectTagInput() {
  const project = useProjectStore((state) => state.project);
  const updateProject = useProjectStore((state) => state.updateProjectField);

  const [roleInputOpen, setRoleInputOpen] = useState(false);
  const [skillInputOpen, setSkillInputOpen] = useState(false);

  const [roleInput, setRoleInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const roleInputRef = useRef<HTMLInputElement>(null);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const openRoleInput = () => {
    if (!roleInputOpen) setRoleInputOpen(true);
  };

  const openSkillInput = () => {
    if (!skillInputOpen) setSkillInputOpen(true);
  };

  const handleRoleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInput(event.target.value);
  };

  const handleSkillInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(event.target.value);
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

    updateProject('role', [...project.role, roleInput]);
    setRoleInput('');
    setRoleInputOpen(false);
  };

  const addSkill = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement>,
  ) => {
    if ('key' in event) {
      if (event.key !== 'Enter') {
        if (event.key === 'Escape') {
          setSkillInput('');
          setSkillInputOpen(false);
        }
        return;
      }
    }

    if (skillInput === '') {
      setRoleInputOpen(false);
      return;
    }

    setSkillInput('');
    setSkillInputOpen(false);
    updateProject('skill', [...project.skill, skillInput]);
  };

  const deleteRoleTag = (index: number) => {
    updateProject(
      'role',
      project.role.filter((_, i) => i !== index),
    );
  };

  const deleteSkillTag = (index: number) => {
    updateProject(
      'skill',
      project.skill.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {
    if (roleInputRef.current) {
      roleInputRef.current.focus();
    }
  }, [roleInputOpen]);

  useEffect(() => {
    if (skillInputRef.current) {
      skillInputRef.current.focus();
    }
  }, [skillInputOpen]);

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
        skillInputOpen &&
        skillInputRef.current &&
        !skillInputRef.current.contains(event.target as Node)
      ) {
        setSkillInput('');
        setSkillInputOpen(false);
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
          {project.role.map((role, index) => (
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

          {project.role.length < 7 && (
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
          {project.skill.map((skill, index) => (
            <div key={index} className={style.tag}>
              {skill}
              <img
                className={style.close}
                src={Close}
                alt="삭제"
                onClick={() => {
                  deleteSkillTag(index);
                }}
              />
            </div>
          ))}

          {skillInputOpen ? (
            <div ref={skillInputRef} className={style.tagInputContainer}>
              <input
                className={style.tagInput}
                type="text"
                maxLength={20}
                value={skillInput}
                onChange={handleSkillInput}
                onKeyDown={addSkill}
              />
              <img src={EnterIcon} alt="등록" onClick={addSkill} />
            </div>
          ) : (
            ''
          )}

          {project.skill.length < 7 && (
            <img
              className={style.addTag}
              src={AddTag}
              alt="태그 추가"
              onClick={openSkillInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectTagInput;
