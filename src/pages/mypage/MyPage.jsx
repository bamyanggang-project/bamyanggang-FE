import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user')); // 사용자 정보를 로컬 스토리지에서 가져옴

    const handleDelete = () => {
        // 사용자에게 회원탈퇴를 다시 한번 확인받음
        if (window.confirm('정말로 회원탈퇴 하시겠습니까?')) {
            navigate('/memberDelete');  // 사용자가 확인을 누르면 MemberDelete 페이지로 이동
        }
    };

    return (
        <div>
            <h1>마이 페이지</h1>
            <div>
                <p>아이디: {userData.userId}</p>
                <p>이름: {userData.userNm}</p>
                <p>닉네임: {userData.userNicknm}</p>
                <p>전화번호: {`${userData.userTel1}-${userData.userTel2}-${userData.userTel3}`}</p>
                <p>이메일: {`${userData.userEmail1}@${userData.userEmail2}`}</p>
                <p>생년월일: {userData.userBirth}</p>
                <p>성별: {userData.userGender}</p>
            </div>
            <button type="button" onClick={() => navigate(`/memberModify/${userData.userId}`)}>회원수정</button>
            <button onClick={handleDelete}>회원탈퇴</button>
        </div>
    );
};

export default MyPage;
