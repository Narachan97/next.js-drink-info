"use client"
import { ReactNode ,useEffect,useRef} from "react"
import style from "./modal.module.css"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"


export default function Modal({children} : {children: ReactNode}){

    const dialogRef= useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(()=>{
        if(!dialogRef.current?.open){
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0,
            });

        }
    },[]);


    return createPortal(
    <dialog ref={dialogRef} className={style.modal}
    onClick={(e)=>{
        if((e.target as any).nodeName === "DIALOG"){
            router.back();
        }
    }}  // 모달 뒷 배경 선택시 뒤로가기
    onClose={()=> router.back()} // esc 눌렀을시 뒤로가기 
    >{children}</dialog>,
    document.getElementById("modal-root") as HTMLElement)
}