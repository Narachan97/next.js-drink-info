"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({error ,reset} : {error : Error ; reset :()=>void}){
   //reset 은 그냥 일반 브라우저 데이터 그대로를 재시도 한다
   //window.location.reload() 이건 그냥 새로고침 한다는느낌
   //router.refresh() 서버 재시작 
    const router = useRouter();

    useEffect(()=> {
        console.log(error.message);
    },[error])
    return (<div>
        <h3>오류가 발생했습니다.!!</h3>
        <button onClick={ ()=>{ 
            startTransition (()=> {
                router.refresh();   //일괄적으로 동시에 처리해준다 
                reset();
            });
            }}>다시시도</button>
    </div>
    )
}