import React, { useState, useEffect } from 'react';
import AppNavbar from './AppNavbar';
import axios from 'axios';

const ReportFormEditor = () => {
  const [fields, setFields] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const [labelValue, setLabelValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [options, setOptions] = useState([]);
  const [optionValue, setOptionValue] = useState('');

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get('/report');
      setFields(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addField = async () => {
    try {
      const newField = {
        type: selectedFieldType,
        label: labelValue,
        name: nameValue,
        options: [...options],
      };
  
    
      await axios.post('/report', newField);
      setFields([...fields, newField]);
      setLabelValue('');
      setNameValue('');
      setSelectedFieldType('');
      setOptions([]);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // 특정 필드 삭제
  const removeField = async (index) => {
    try {
      await axios.delete(`/report/${index}`);
      const updatedFields = fields.filter((field) => field.id !== index);
      setFields((prevFields) => prevFields.filter((field) => field.id !== index));
      setFields(updatedFields);
    } catch (error) {
      console.error(error);
    }
  };

  // 필드의 값 업데이트
  const updateFieldValue = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`필드변경 완료`);
  };
  //필드 타입 선택
  const handleFieldTypeChange = (e) => {
    setSelectedFieldType(e.target.value);
  };
  //필드 레이블 선택
  const handleLabelChange = (e) => {
    setLabelValue(e.target.value);
  };
  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  // 선택지 추가
  const handleOptionAdd = () => {
    if (selectedField && optionValue.trim() !== "") {
      setSelectedField((prevField) => ({
        ...prevField,
        options: [...prevField.options, optionValue],
      }));
      setOptionValue("");
    } else {
      setOptions([...options, optionValue]);
    }
    setOptionValue('');
  };
  // 선택지 값 업데이트
  const handleselOption = (idx, value) => {
    setSelectedField((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[idx] = value;
  
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleselOptionRemove = (optionIdx) => {
    if (!selectedField) return;
  
    const updatedField = { ...selectedField };
  
    updatedField.options = updatedField.options.filter(
      (_, idx) => idx !== optionIdx
    );
  
    setSelectedField(updatedField);
  };

  const updateField = async () => {
    try {
      await axios.put(`/report/${selectedField.id}`, selectedField); 
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderAside = () => {
    if (selectedField) {
      return (
        <div>
          <h3>필드 수정</h3>
          <p class="acont">
            <h4>필드 이름</h4>
            <input type="text" 
            value={selectedField.label} 
            onChange={(e) => setSelectedField({ ...selectedField, label: e.target.value })} />
          </p>
          <p class="acont">
            <h4>필드 설명</h4>
            <input type="textarea" 
            value={selectedField.name} 
            onChange={(e) => setSelectedField({ ...selectedField, name: e.target.value })} />
          </p>
          <p class="acont">
            <h4>필드 타입</h4>
            <select value={selectedField.type } onChange={(e) => setSelectedField({ ...selectedField, type: e.target.value })}>
              <option value="">선택하세요</option>
              <option value="text">텍스트 필드</option>
              <option value="textarea">텍스트 에어리어 필드</option>
              <option value="radio">단일선택 필드</option>
              <option value="checkbox">다중선택 필드</option>
            </select>
            </p>
            {(selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
              <>
                {selectedField.options.map((option, idx) => (
                  <div key={idx}>
                  <label>
                  옵션{idx}:
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleselOption(idx, e.target.value)}
                    />
                  <button type="button" onClick={() => handleselOptionRemove(idx)}>
                    삭제
                  </button>
                  </label>
                  </div>
                ))}
                <h3>선택지</h3>
                <div>
                  <input
                    type="text"
                    value={optionValue}
                    onChange={(e) => setOptionValue(e.target.value)}
                  />
                  <button type="button" onClick={handleOptionAdd}>
                    선택지 추가
                  </button>
                </div>
              </>
            )}
          <button type="button" onClick={() => setSelectedField(null)}>
            취소
          </button>
          <button type="button" onClick={() => updateField(selectedField)}>
            저장
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>필드 등록</h3>
          <p class="acont">
            <h4>필드 이름</h4>
            <input type="text" value={labelValue} onChange={handleLabelChange} />
          </p>
          <p class="acont">
            <h4>필드 설명</h4>
            <input type="textarea" value={nameValue} onChange={handleNameChange} />
          </p>
          <p class="acont">
            <h4>필드 타입</h4>
            <select value={selectedFieldType} onChange={handleFieldTypeChange}>
              <option value="">선택하세요</option>
              <option value="text">텍스트 필드</option>
              <option value="textarea">텍스트 에어리어 필드</option>
              <option value="radio">단일선택 필드</option>
              <option value="checkbox">다중선택 필드</option>
            </select>
            </p>
            {(selectedFieldType === 'radio' || selectedFieldType === 'checkbox') && (
              <>
                {options.map((option, idx) => (
                  <label>
                    옵션{idx}:{option}<br></br>
                  </label>
                ))}
                <h3>선택지</h3>
                <div>
                  <input
                    type="text"
                    value={optionValue}
                    onChange={(e) => setOptionValue(e.target.value)}
                  />
                  <button type="button" onClick={handleOptionAdd}>
                    선택지 추가
                  </button>
                </div>
              </>
            )}
            <button type="button" onClick={addField} disabled={!selectedFieldType || !labelValue || !nameValue|| !options}>추가</button>
          </div>
      );
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <AppNavbar/>
      <aside>
        {renderAside()}
      </aside>
      <section>
      {fields.map((field, index) => (
        field.type === 'text' && (
          <div key={index} >
            <label onClick={() => handleFieldClick(field)}>
              레이블:{field.label}
            </label>
            <br></br>
            <label>
              <input class="inputtext"
                type="text"
                value={field.value}
                onChange={(e) => updateFieldValue(index, e.target.value)}
              />
            </label>
            <button type="button" onClick={() => removeField(field.id)}>삭제</button>
          </div>
        )
        || field.type === 'textarea' && (
          <div key={index} >
            <label onClick={() => handleFieldClick(field)}>
              레이블:{field.label}
            </label>
            <br></br>
            <label>
              <textarea class="inputarea"
                value={field.value}
                onChange={(e) => updateFieldValue(index, e.target.value)}
              />
            </label>
            <button type="button" onClick={() => removeField(field.id)}>삭제</button>
          </div>
        )
        || field.type === 'radio' && (
          <div key={index}>
            <label onClick={() => handleFieldClick(field)}>
            레이블:{field.label}
            </label>
            <br></br>
            {field.options.map((option, optionIndex) => (
            <span key={optionIndex}>
              <input
                type={field.type}
                id={`option-${optionIndex}`}
                name={`field-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              />
              <label htmlFor={`option-${optionIndex}`}>{option}</label>
            </span>
          ))}
            <button type="button" onClick={() => removeField(field.id)}>삭제</button>
          </div>
        )
        || field.type === 'checkbox' && (
          <div key={index} >
            <label onClick={() => handleFieldClick(field)}>
            레이블:{field.label}
            </label>
            <br></br>
            {field.options.map((option, optionIndex) => (
            <span key={optionIndex}>
              <input
                type={field.type}
                id={`option-${optionIndex}`}
                name={`field-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              />
              <label htmlFor={`option-${optionIndex}`}>{option}</label>
            </span>
          ))}
            <button type="button" onClick={() => removeField(field.id)}>삭제</button>
          </div>
        )
      ))}


      

      </section>
    </form>
  );
};
//<button type="submit" >변경 완료</button>
export default ReportFormEditor;