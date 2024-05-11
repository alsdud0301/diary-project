'use client'
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";



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
            const response = await axios.post('/api/user', data);
            alert("회원가입이 완료되었습니다");
            router.push('/login')
            console.log("서버 응답:", response); // 서버로부터의 응답
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} placeholder="Name" />
                <input type="text" {...register("userID")} placeholder="UserID" />
                <input type="email" {...register("email")} placeholder="Email" />
                <input type="password" {...register("password")} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default Signup;


