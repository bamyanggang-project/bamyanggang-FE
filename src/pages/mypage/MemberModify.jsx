import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './MemberModify.css';

const MemberModify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        userPw: '',
        userNm: '',
        userNicknm: '',
        userTel1: '',
        userTel2: '',
        userTel3: '',
        userEmail1: '',
        userEmail2: '',
        userBirth: '',
        userGender: 'Male'
    });
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // URL 수정: /member/ -> /members/
                const response = await axios.get(`http://localhost:3001/member/${id}`);
                if (response.data) {
                    setFormData(response.data);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('데이터 로딩 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // URL 수정: /member/ -> /members/
            const response = await axios.put(`http://localhost:3001/member/${id}`, formData);
            if (response.status === 200) {
                alert('회원 정보가 수정되었습니다.');
                navigate('/myPage'); // 수정이 성공하면 마이 페이지로 이동
            } else {
                console.error('회원 정보 수정 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원 정보 수정 처리 중 에러 발생:', error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>; // 데이터 로딩 중
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>회원 수정</h1>
            <div className="userContainer">
                <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="아이디" disabled />
                <input type="password" name="userPw" value={formData.userPw} onChange={handleChange} placeholder="새 비밀번호" />
                {errors.userPw && <p className="error-message">{errors.userPw}</p>}
            </div>
            <div className="infoContainer">
                <input type="text" name="userNm" value={formData.userNm} onChange={handleChange} placeholder="이름" />
                <input type="text" name="userNicknm" value={formData.userNicknm} onChange={handleChange} placeholder="닉네임" />
                <input type="date" name="userBirth" value={formData.userBirth} onChange={handleChange} placeholder="생년월일" />
                <div className="email-container">
                    <input type="text" name="userEmail1" value={formData.userEmail1} onChange={handleChange} placeholder="이메일 앞부분" />
                    <span>@</span>
                    <input type="text" name="userEmail2" value={formData.userEmail2} onChange={handleChange} placeholder="이메일 뒷부분" />
                </div>
                <div className="phonenum">
                    <input type="text" name="userTel1" maxLength="3" value={formData.userTel1} onChange={handleChange} placeholder="전화번호1" />
                    -
                    <input type="text" name="userTel2" maxLength="4" value={formData.userTel2} onChange={handleChange} placeholder="전화번호2" />
                    -
                    <input type="text" name="userTel3" maxLength="4" value={formData.userTel3} onChange={handleChange} placeholder="전화번호3" />
                </div>
            </div>
            <div className="genderContainer">
                <button type="button" onClick={() => setFormData({...formData, userGender: 'Male'})} className={`genderOption ${formData.userGender === 'Male' ? 'selected' : ''}`}>
                    남자
                </button>
                <button type="button" onClick={() => setFormData({...formData, userGender: 'Female'})} className={`genderOption ${formData.userGender === 'Female' ? 'selected' : ''}`}>
                    여자
                </button>
            </div>
            <button type="submit">회원 정보 수정</button>
        </form>
    );
};

export default MemberModify;
