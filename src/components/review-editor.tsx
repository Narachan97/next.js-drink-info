"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css"
import {createReviewAction} from "@/actions/create-review.action"
export default function ReviewEditor({bookId}:{bookId : string}){

 const [state,formAction,isPending]= useActionState(createReviewAction,null);

 useEffect(()=> { //에러핸들링 
  if(state && ! state.status){
    alert(state.error);
  }
 },[state]);

  return <section>
    <form action={formAction} className={style.form_container}>
      <input name="bookId" value={bookId} hidden readOnly/>
      <textarea disabled={isPending} required name="content" placeholder="리뷰 내용 "/>
      <div className={style.submit_container}>
      <input required disabled={isPending} name="author" placeholder="작성자 "></input>
      <button  disabled={isPending} type="submit">{isPending ? "..." : "작성하기"} </button>
      </div>
    </form>
  </section>

}
