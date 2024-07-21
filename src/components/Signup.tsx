'use client'
import React  from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./css/signup.css"
import { useRouter } from 'next/router';
import Link from "next/link";

// import Menubar_ from "./menubar"


type SignupForm = {
    name: string,
    userID: string,
    email: string, 
    password: string
}

function Signup() {

    const { register, handleSubmit } = useForm<SignupForm>();
    const router = useRouter();
   
    const onSubmit = async (data: SignupForm) => {
        try {
            console.log("회원 가입 양식 데이터:", data); // 입력된 데이터 콘솔에 출력
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, data);
            alert("회원가입이 완료되었습니다");
            router.push("/login")
            console.log("서버 응답:", response); // 서버로부터의 응답
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <><header className='signup_header'>
            <div className='logo'>
                <Link href="/home" className='link'>Diary</Link>
            </div>
        </header>
        <section className="form_section">
        <div className="submit-div">
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="form_div">
                    <div className="name_div">
                    <input className="name_input" type="text" {...register("name")} placeholder="이름" />
                    </div>
                    <div className="userID_div">
                    <input className="userID_input" type="text" {...register("userID")} placeholder="아이디" />
                    </div>
                    <div className="email_div">
                    <input className="email_input" type="email" {...register("email")} placeholder="이메일" />
                    </div>
                    <div className="password_div">
                    <input className="password_input" type="password" {...register("password")} placeholder="비밀번호" />
                    </div>
                    
                    <button className="signup_btn" type="submit">회원가입</button>
                    <div className="link_div">
                    <Link href="/login" className="login_link">로그인</Link>
                    <Link href="/fpassword" className="fpassword_link">비밀번호 찾기</Link>
                    <Link href="/fid" className="fid_link">아이디 찾기</Link>
                    </div>
                    </div>
                    
                </form>
            </div>
            </section>
            </>
    );
}


export default Signup;


