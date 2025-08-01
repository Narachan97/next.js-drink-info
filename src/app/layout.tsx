import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

async function Footer() {

  const response = await fetch (`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,{cache : "force-cache"});

  if(!response.ok){
    return <footer>제작 @narachan</footer>
  }

  const books : BookData[] = await response.json();
  const bookCount = books.length;

  return <footer>
 <div>제작 @narachan</div>
 <div>{bookCount}개의 도서가 등록되어 있습니다</div>

  </footer>
  
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal : ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer><Footer></Footer></footer>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
