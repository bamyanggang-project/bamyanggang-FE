import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MemberDelete.css';

const MemberDelete = () => {
    const [credentials, setCredentials] = useState({ userId: '', userPw: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 사용자 인증을 위해 정보 요청
            const response = await axios.get(`http://localhost:3001/member?userId=${credentials.userId}&userPw=${credentials.userPw}`);
            if (response.data.length > 0) {
                const userId = response.data[0].id; // 사용자의 고유 ID를 얻음
                // 인증된 사용자의 데이터를 삭제
                const deleteResponse = await axios.delete(`http://localhost:3001/member/${userId}`);
                if (deleteResponse.status === 200) {
                    alert('회원 탈퇴되었습니다.');
                    navigate('/login'); // 로그인 페이지로 리다이렉트
                } else {
                    alert('회원 탈퇴에 실패했습니다.');
                }
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (error) {
            alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
            console.error('회원 탈퇴 처리 중 에러 발생:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>회원 탈퇴</h1>
            <div>
                <label>아이디:</label>
                <input type="text" name="userId" value={credentials.userId} onChange={handleChange} required />
            </div>
            <div>
                <label>비밀번호:</label>
                <input type="password" name="userPw" value={credentials.userPw} onChange={handleChange} required />
            </div>
            <button type="submit">회원 탈퇴</button>
        </form>
    );
};

export default MemberDelete;
