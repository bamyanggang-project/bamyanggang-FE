import  { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import "./MemberJoin.css";
import Button from "../../component/common/Button";

function MemberJoin(props) {
const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum1, setPhoneNumber1] = useState("");
  const [phoneNum2, setPhoneNumber2] = useState("");
  const [phoneNum3, setPhoneNumber3] = useState("");
  const [emailNum1, setEmailNum1] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com"); // 기본값 설정
  const [emailDomainInput, setEmailDomainInput] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("남성");

  //ID 
  const handleIdChange = event => {
    setUserId(event.target.value);
    setIsIdAvailable(null);
  };

  //ID 유효성 검사 
  const handleCheckIdAvailability = async () => {
    try {

      const response = await axios.post('/api/checkIdAvailability/idCheck', userId); 
      

      console.log('응답 값:', response.data);
      setIsIdAvailable(response.data);

    }catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };

  //이름
  const handlenNameChange = event => {
    setUsername(event.target.value);
  };

  //nickname
  const handlenickNameChange = event => {
    setNickName(event.target.value);
  };

  //nickname 유효성 검사.
  const handleCheckNickNameAvailability = async () => {
    try {
      const response = await axios.get(`/api/checkIdAvailability/nickNameCheck/${nickName}` ); 

    console.log('응답 값:', response.data);
    setIsNickNameAvailable(response.data);
  
    } catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };

  //password
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };


  //프로필 이미지
  const handleProfileImageChange = event => {
    const selectedFile = event.target.files[0];
    setProfileImage(selectedFile);
  };

  //핸드폰 번호 값
  const handlePhoneNumberChange = event => {
    let value = event.target.value.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    // 최대 3자리까지만 허용  
    setPhoneNumber1(value);
  };

  const handlePhoneNumberChange2 = event => {
    let value = event.target.value.replace(/\D/g, '');
    setPhoneNumber2(value);
    
  };

  const handlePhoneNumberChange3 = event => {
    let value = event.target.value.replace(/\D/g, '');
    setPhoneNumber3(value);
    
  };

  //이메일
  const handleEmailChange = event =>{
    setEmailNum1(event.target.value);
  }

  const emailDomains = ["gmail.com", "naver.com", "hanmail.com", "yahoo.com", "직접입력"];

  const handleEmailDomainChange = event => {
    const value = event.target.value;
    if (value === "직접입력") {
      setEmailDomain(""); 
      setEmailDomainInput(true); 
    } else {
      setEmailDomain(value);
      setEmailDomainInput(false); 
    }
};

  //생년월일
  const handleBirthChange = event => {
    setBirth(event.target.value);
  };

  //성별
  const handleGenderChange = event => {
    setGender(event.target.value);
  }

  //회원 정보 DB로 전달
  const handleSubmit = async () => {
    const userInfo = {
      userId,
      nickName,
      userName: username,
      passWd: password,
      profileImagePath: profileImage ? profileImage.name : '',
      phoneNum1,
      phoneNum2,
      phoneNum3,
      emailNum1,
      emailNum2: emailDomain,
      birth,
      gender: gender === "male" ? "M" : "F",
    };

    try {

      const response1 = await axios.post('/api/addmember', userInfo, {
        


        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert("회원가입이 완료되었습니다.");

      // 이미지가 있는 경우에만 이미지를 업로드하는 axios 요청을 보냅니다.
      if (profileImage) {
        const formData = new FormData();
        formData.append('profileImage', profileImage);

        const response2 = await axios.post('/api/addmember/image', formData);

        if (response1.status === 200 && response2.status === 200) {
          const data1 = response1.data;
          const data2 = response2.data;
          
        } else {
          alert('회원가입(중복검사 해주세요) 또는 이미지 업로드에 실패했습니다.');
        }

      }else {

        if (response1.status === 200) {
          const data1 = response1.data;
          navigate('/');
        } else {
          alert('회원가입(중복검사 해주세요)에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  return (
    
    <div className='totalContainer'>

      <div className='mainBanner'>
        <img src='/images-jsx/밤양갱_black.svg' />
      </div>

      <div className='joinTitle'><h2>회원가입</h2></div>

      <div className='container'>
        <div className='topArea'>
          <div className='idArea'>
            <div className='idBox'>
              <input type="text" placeholder='아이디' value={userId} onChange={handleIdChange} className='inputBox'/>
              <div className='btnArea'>
               <Button text={"중복확인"} type={"idCheckBtn"} onClick={handleCheckIdAvailability} />
              </div>
            </div>

            {isIdAvailable === 0 ? 
            <div className='idCheck' style={{ color: 'black' }}> 사용 가능한 아이디입니다.</div> : 
            isIdAvailable === 1 ? 
            <div className='idCheck' style={{ color: 'red' }}> 이미 사용 중인 아이디입니다.</div> : 
            null}
          </div>

          <div className='passwdArea'>
            <div>
              <input type='password' placeholder='비밀번호' onChange={handlePasswordChange} value={password} className='inputBox'/>
            </div>
          </div>

          <div className='nickNameArea'>
            <div className='nickNameBox'>
                <input type='text' placeholder='닉네임' value={nickName} onChange={handlenickNameChange} className='inputBox'/>
                <div className='btnArea'>
                  <Button text={"중복확인"} type={"nickNameCheckBtn"} onClick={handleCheckNickNameAvailability}/>
                </div>
            </div>

            {isNickNameAvailable === 0 ? 
            <div className='idCheck' style={{ color: 'black' }}> 사용 가능한 닉네임입니다.</div> : 
            isNickNameAvailable >= 1 ? 
            <div className='idCheck' style={{ color: 'red' }}> 이미 사용 중인 닉네임입니다.</div> : 
            null}

          </div>
        </div>

        <div className='middleArea'>
          <div className='nameArea'>
            <div>
              <input type="text" placeholder='이름' value={username} className='inputBox' onChange={handlenNameChange}/>
            </div>
          </div>

          <div className='birthArea'>
              <input type='text' placeholder='생년월일 6자리를 입력해주세요' value={birth} onChange={handleBirthChange} className='inputBox'/>
          </div>

          <div className='phoneArea'>
              <div>
                <input type="text" placeholder="01X" maxLength={3} value={phoneNum1} onChange={handlePhoneNumberChange} className='phoneFirstInputBox'/> -
                <input type="text" placeholder="●●●●" maxLength={4} value={phoneNum2} onChange={handlePhoneNumberChange2} className='phoneInputBox'/> -
                <input type="text" placeholder="●●●●" maxLength={4} value={phoneNum3} onChange={handlePhoneNumberChange3} className='phoneInputBox'/>
              </div>
          </div>
          
          <div className='emailArea'>
              <input type="text" value={emailNum1} placeholder='이메일' onChange={handleEmailChange} className='emailInputBox'/> @ 
                {emailDomainInput ? (
                      <input type="text" placeholder='도메인을 직접 입력하세요' onChange={handleEmailDomainChange} className='domainBox'/>
                  ) :(
                      <select value={emailDomain} onChange={handleEmailDomainChange} className='domainSelect'>{emailDomains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>))}
                      </select>
                    )
                }
          </div>
        </div>

        <div className='genderArea'>
          <div className='maleBox'>
            <label className={`genderButton ${gender === 'male' ? 'active' : ''}`} htmlFor='male'>
              <input type='radio' id='male' value='male' className='genderType' checked={gender === 'male'} onChange={handleGenderChange} />
              남성
            </label>
          </div>
          <div className='femaleBox'>
            <label className={`genderButton ${gender === 'female' ? 'active' : ''}`} htmlFor='female'>
              <input type='radio' id='female' value='female' className='genderType' checked={gender === 'female'} onChange={handleGenderChange} />
              여성
            </label>
         </div>
        </div>

        <div className='profileArea'>
          <div className='profileTitle'>프로필 이미지 설정</div>
            <div>
              <input className="profileInputBox" type="file" accept="image/*" onChange={handleProfileImageChange} />
            </div>
        </div>
      </div>

        <div className='submitArea'>
          <div className='submitBtnArea'>
            <Button text={"회원가입"} type={"submitBtn"} onClick={handleSubmit} />
          </div>
        </div>
    </div>
  );
  
}


export default MemberJoin;

