import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../component/common/Button";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import "./Community.css";

function CommunityWrite(){
    const navigate = useNavigate();

    const [postNo, setPostNo] =useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImage] = useState('');

    //날짜 출력
    const date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth())+1;
        month = month >=10 ? month : '0'+month;
    let day = date.getDate();

    //날짜 커스텀
    const formatDate = year+('-')+month+('-')+day;
    
    //db insert함수
    const insert=()=>{

        //title, content 길이 유효성 검사
        if (title.length > 100){
            alert('제목은 100자 이내로 입력해주세요');
            return;
        }

        if(content.length > 1000){
            alert('내용은 1000자 이내로 입력해주세요');
            return;
        }

        //게시글 추가
        alert('게시글 추가');
        axios.post('http://localhost:3001/community',{
            //postNo는 나중에 삭제
            'postNo' : postNo,
            'title' : title,
            'content' : content,
            'wrtnDate' : formatDate,
            'img' : img

        }).then(function (response){
            navigate(`/community`);

        }).catch(function(error){
            console.log("error", error);

        });

    }

    return(
        <div>
            <Header />
            <SubBanner />
            <div className="communityList">
                <h1>커뮤니티</h1>
                <br/>
                <br/>
                <div className="communityWrite">
                    <div className="inputTitleArea">
                        <input className="inputTitle"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                        }}
                        />
                    </div>
                    
                    <div className="inputContentArea">
                        <textarea className="inputContent" 
                            value={content}
                            onChange={(event)=>{
                                setContent(event.target.value);
                            }}
                        />
                    </div>
                    
                        
                    <div>
                        <button>
                            <input hidden
                            type="file"
                            accept="image/jpg,image/png,image/jpeg,image/gif" 
                            />
                        </button>
                    </div>

                    <div className="writeButton">
                    <Button 
                    text={"등록"}
                    type={"submitButton"}
                    onClick={()=>insert()}
                    />

                    <Button 
                    text={"취소"}
                    type={"cancelButton"}
                    onClick={()=>{
                        navigate(`/community`)
                    }}
                    />
                    </div>
                </div>
            </div>
        </div>

       
    )
}



export default CommunityWrite;