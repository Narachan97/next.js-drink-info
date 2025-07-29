import style from "./book-item-skeleton.module.css"
export default function BookItemSkeleton() {

    return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}></div>
        <div className={style.titie}></div>
        <div className={style.subtitie}></div>
        <br></br>
        <div className={style.author}></div>
    </div>
    )
}