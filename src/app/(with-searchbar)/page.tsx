import BookItem from "@/components/book-item";
import style from "./page.module.css";

import { BookData } from "@/types";

import { Suspense } from "react";

import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";


// export const dynamic = '' //특정페이지 유형을 stataic dynamic 으로 설정 가능
// // 1. auto 
// // 2. force-dynamic
// // 3. force-static
// // 4. erre


async function AllBooks(){

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,{ cache : "force-cache"});
    if(!response.ok){
      return <div>
        오류발생
      </div>
    }
  const allBooks : BookData[] =  await response.json();


  return <div>
       {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
  </div>
}
async  function  RecoBooks(){

   const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,{next : {revalidate : 3 }});  
      if(!response.ok){
      return <div>
        오류발생
      </div>
    }
    const recoBooks : BookData[] = await response.json();
  

    return <div>
         {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
    </div>
}


export const metadata : Metadata ={
  title: "한입 북스",
  description : "한입 북스에 등록된 도서를 만나보세요",
  openGraph : {
    title : "한입 북스 ",
    description : "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  }
}

export default async function Home() {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
       <RecoBooks></RecoBooks>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
      <AllBooks></AllBooks>
      </section>
    </div>
  );
}
