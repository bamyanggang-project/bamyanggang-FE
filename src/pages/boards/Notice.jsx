import Header from "../../layouts/Header";
import NoticeList from "../../component/boards/NoticeList";
import "./Notice.css";
import SubBanner from "../../layouts/SubBanner";
import { useNavigate } from "react-router";


function Notice(props){

    const navigate = useNavigate();
    
    return(
        <div>
             <Header />
             <SubBanner />
             <div className="noticeList">
                <h1>공지사항</h1>
                    <br/>
                    <br/>
                    <NoticeList
                    onClickItem={(noticeData)=>{
                        navigate(`/notice/${noticeData.postNo}`);
                    }}/>
            </div>
        </div>
    )
}

export default Notice;