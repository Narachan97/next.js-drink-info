import { notFound } from "next/navigation";
import style from "./page.module.css";

import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from '@/components/review-editor';
import Image from "next/image";


//export const dynaimcParams = false; // 미리 구현해놓은게 아니면 전부 404 로 넘어간다 

export async function generateStaticParams() {  //스태틱으로 강제로 구현됨  이것도 라우트 세그먼트 포함
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if(!response.ok){
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();
  return  books.map((book)=> ({
    id : book.id.toString()

  }))

}

async function BookDetail({bookId} : {bookId : string}){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,{cache :"force-cache"});
      if(!response.ok){
        if(response.status === 404)
        {
          notFound();
        }
      return <div>
        오류발생
      </div>
    }
    const book = await response.json();

  const {title, subTitle, description, author, publisher, coverImgUrl } =book;

  return (
    <section >
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
   <Image src={coverImgUrl} width={240} height={300} alt="이미지 불러오는중"></Image>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section >
  )
}


async function ReviewList({bookId}:{bookId : string}) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,{next : {tags : [`review-${bookId}`]}})
  if(!response.ok){
    throw new Error(`review fetch failed : ${response.statusText}`);
  }

  const reviews : ReviewData[] = await response.json();
  return (
    <section>
{reviews.map((review)=>
<ReviewItem key = {`review-itme-${review.id}`} {...review}></ReviewItem>)}
    </section>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string  }>;
}){

const {id} = await params;
 const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,{cache :"force-cache"});

 if(!response.ok){
  throw new Error(response.statusText);
 }
 const book : BookData = await response.json();

  return {
    title: `${book.title} : 한입북스 `,
    description : `${book.description} 입니다 `,
    openGraph : {
    title :  `${book.title} : 한입북스 `,
    description : `${book.description} 검색 결과 입니다 `,
    images: [book.coverImgUrl],
  }
}

}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string  }>;
}) {
  const {id} = await params;
 return (
  <div className={style.container}>
     <BookDetail bookId={id}></BookDetail>
     <ReviewEditor bookId={id}></ReviewEditor>
     <ReviewList bookId={id}></ReviewList>
  </div>
 )
  
}
