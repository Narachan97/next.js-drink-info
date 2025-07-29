'use server'


import { revalidateTag } from "next/cache";

export async function deleteReviewAction(_:any, formData : FormData){
    const reviewId = formData.get("reviewId")?.toString();
    const bookId = formData.get("bookId")?.toString();
  

    if(!reviewId){
        return {
            status : false,
            error : "삭제할 리뷰가 없습니다",
        };
    }

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,{method : "DELETE",});
        console.log(response)
        if(!response.ok){
            throw new Error(response.statusText);
        }

        revalidateTag(`review-${bookId}`)
        return{
            status : true,
             error: "",        
    };

    }catch(err){

        return {
            status: false,
            error : `리뷰 삭제 실패 : ${err}`,
        }
    }
}