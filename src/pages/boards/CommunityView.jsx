import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import axios from "axios";
import ReplyList from "../../component/boards/ReplyList";
import ReplyWrite from "../../component/boards/ReplyWrite";

function CommunityView(){

    const navigate = useNavigate();

    //url parameter 값으로 사용할 변수 설정
    const {postNo} = useParams();
    const [selectedCommunity, setSelectedCommunity] = useState([]);

    const prevPostNo = parseInt(postNo)-1;
    const [prevCommunity, setPrevCommunity] = useState([]);

    const nextPostNo = parseInt(postNo)+1;
    const [nextCommunity, setNextCommunity] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/community?postNo=${prevPostNo}`)
        .then((response)=>{
            if(response.data.length > 0){
                setPrevCommunity(response.data[0])
            }else{
                setPrevCommunity(null);
            }
        })

        .catch(error=>{
            console.error("데이터 에러", error);
        })
    },[prevPostNo]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/community?postNo=${postNo}`)
            .then((response)=>{
                setSelectedCommunity(response.data[0]);
            })

            .catch(error=>{
                console.error("데이터 에러", error);
            })
    }, [postNo]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/community?postNo=${nextPostNo}`)
        .then((response)=>{
            if(response.data.length > 0){
                setNextCommunity(response.data[0])
            }else{
                setNextCommunity(null);
            }
        })

        .catch(error=>{
            console.error("데이터 에러", error);
        })
    },[nextPostNo]);
    


    return(
        <div>
            <Header />
            <SubBanner />
            <div className="communityList">
                <h1>커뮤니티</h1>
                <br/>
                <br/>
                <div className="communityTotal">
                    <div className="communityViewHead">
                        <div className="communityViewTitle">
                            {selectedCommunity.title}
                        </div>

                        <div className="communityViewInfo">
                            <div className="communityViewInfoLeft">
                                {selectedCommunity.userId}
                            </div>

                            <div className="communityViewInfoRight">
                                <div className="communityViewVwCnt">
                                   view : {selectedCommunity.vwCnt}
                                </div>

                                <div className="communityViewWrtnDate">
                                  작성일 : {selectedCommunity.wrtnDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="communityViewContent">
                        {selectedCommunity.content && selectedCommunity.content.split("\n").map((line)=>{
                            return(
                                <span>
                                    {line}
                                    <br/>
                                </span>
                            )
                        })}
                    </div>
                    
                    {/*댓글 리스트 부분*/}
                    <div className="replyArea">
                        <ReplyList 
                        selectedCommunity={selectedCommunity}
                        />
                    </div>
                    
                    <div>
                        <ReplyWrite 
                        postNo={postNo}
                        />
                    </div>

                    <div className="navCommunity">
                        {prevCommunity && prevCommunity.title ? (
                            <div className="prevCommunity" onClick={()=> navigate(`/community/${prevCommunity.postNo}`)}>
                                <div className="prevMenu">이전글</div>
                                <div className="prevTitle"> {prevCommunity.title}</div>
                                <div className="prevDate">{prevCommunity.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonPrevCommunity">
                                이전글이 없습니다.
                            </div>
                        )}

                        {nextCommunity && nextCommunity.title ? (
                            <div className="nextCommunity" onClick={()=> navigate(`/community/${nextCommunity.postNo}`)}>
                                <div className="nextMenu">다음글</div>
                                <div className="nextTitle"> {nextCommunity.title}</div>
                                <div className="nextDate">{nextCommunity.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonNextCommunity">
                                다음글이 없습니다.
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
    
}

export default CommunityView;