import style from './ProjectTagSection.module.css';

import AddTag from '../../../assets/image/icon/AddTag.svg';
import Close from '../../../assets/image/icon/Close.svg';

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
      setRoleInput('');
      setRoleInputOpen(false);
      updateProject('roles', [...project.roles, roleInput]);
    } else if (event.key === 'Escape') {
      setRoleInput('');
      setRoleInputOpen(false);
    }
  };

  const addTech = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTechInput('');
      setTechInputOpen(false);
      updateProject('techs', [...project.techs, techInput]);
    } else if (event.key === 'Escape') {
      setTechInput('');
      setTechInputOpen(false);
    }
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
    <div className={style.tagContainer}>
      <div className={style.inputLabel}>
        <span className={style.label}>나의 역할</span>
        <div className={style.tagSec}>
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
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>사용 기술</span>
        <div className={style.tagSec}>
          {project.techs.map((tech, index) => (
            <div key={index} className={style.tag}>
              {tech}
              <img
                className={style.close}
                src={Close}
                alt="닫기"
                onClick={() => {
                  deleteTechTag(index);
                }}
              />
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
      </div>
    </div>
  );
}

export default ProjectTagSection;
