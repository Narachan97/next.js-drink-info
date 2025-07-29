
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
async function SearchResult({q} : {q:string} ){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,{cache: "force-cache"});
    if(!response.ok){
      return <div>
        오류발생
      </div>
    }
  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({searchParams,}: {searchParams : Promise<{q? : string}>}) : Promise<Metadata>{
  const {q} = await searchParams;
  //현재 페이지 메타 데이터를 동적으로 생성 하는 역할 즉 페이지 컴포넌트 프롭스를 받아서 사용할수있다.
  return {
    title: `${q} : 한입북스 `,
    description : `${q} 검색 결과 입니다 `,
    openGraph : {
    title :  `${q} : 한입북스 `,
    description : `${q} 검색 결과 입니다 `,
    images: ["/thumbnail.png"],
  }
  }
}




export default  async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const {q} = await searchParams;

 return <Suspense key={q || ""} fallback={<BookListSkeleton count={3}></BookListSkeleton>}> <SearchResult q={q || ""}></SearchResult></Suspense>
}
