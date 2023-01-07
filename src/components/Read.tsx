/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IBlogData, NextAndPrev, PageType } from './common/common';
import { blogdataState, pageTypeState, readPageIndexState, updatePageIndexState } from './common/store';

interface PRead {
   index: number;
}

export const Read: React.FC<PRead> = (props) => {
   const [blogDatas, setblogDatas] = useRecoilState(blogdataState);
   const [blog, setBlog] = useState<IBlogData>();
   const [prevBlog, setPrevBlog] = useState<IBlogData | undefined>();
   const [nextBlog, setNextBlog] = useState<IBlogData | undefined>();
   const setReadPageIndex = useSetRecoilState(readPageIndexState);
   const setUpdatePageIndex = useSetRecoilState(updatePageIndexState);
   const setPageType = useSetRecoilState(pageTypeState);

   useEffect(() => {
      if (props.index) {
         const thisBlogData: IBlogData | undefined = blogDatas.find((element) => element.index === props.index);
         const prevBlogData: IBlogData | undefined = blogDatas.find((element) => element.index === props.index - 1);
         const nextBlogData: IBlogData | undefined = blogDatas.find((element) => element.index === props.index + 1);

         setBlog(thisBlogData);
         setPrevBlog(prevBlogData);
         setNextBlog(nextBlogData);
      }
   }, [props.index]);

   const Td = styled.td`
      text-align: center;
   `;

   const Button = styled.button`
      padding: 10px;
   `;

   const onClickMoveList = () => {
      setReadPageIndex(-1);
      setPageType(PageType.List);
   };

   const onClickPrevAndNext = (action: NextAndPrev) => {
      switch (action) {
         case NextAndPrev.Next:
            if (nextBlog) {
               let newData: IBlogData[] = [...blogDatas];
               newData.splice(
                  newData.findIndex((element) => element.index === nextBlog.index),
                  1,
                  { ...nextBlog, count: nextBlog.count! + 1 }
               );
               setReadPageIndex(nextBlog.index);
               setblogDatas(newData);
            }
            break;
         case NextAndPrev.Prev:
            if (prevBlog) {
               let newData: IBlogData[] = [...blogDatas];
               newData.splice(
                  newData.findIndex((element) => element.index === prevBlog.index),
                  1,
                  { ...prevBlog, count: prevBlog.count! + 1 }
               );
               setblogDatas(newData);
               setReadPageIndex(prevBlog.index);
            }
            break;
      }
   };

   const onClickUpdate = () => {
      setPageType(PageType.Write);
      setUpdatePageIndex(blog?.index!);
   };

   const onClickDelete = () => {
    let newDatas:IBlogData[]=[...blogDatas];
    newDatas.splice(newDatas.findIndex(element => element.index === props.index),1);
    setblogDatas(newDatas);
    setPageType(PageType.List);
   };

   return (
      <div
         css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
         `}
      >
         <h1
            css={css`
               margin-top: 50px;
            `}
         >
            {blog?.subject}
         </h1>
         <div
            css={css`
               width: 90%;
               text-align: end;
            `}
         >
            조회수 : {blog?.count}
         </div>
         <div
            css={css`
               margin-top: 5px;
               display: flex;
               justify-content: space-between;
               width: 90%;
            `}
         >
            <Button onClick={onClickMoveList}>목록으로</Button>
            <div>
               <Button
                  css={css`
                     margin-right: 5px;
                  `}
                  onClick={onClickUpdate}
               >
                  수정
               </Button>
               <Button onClick={onClickDelete}>삭제</Button>
            </div>
         </div>
         <div
            css={css`
               margin-top: 10px;
               width: 90%;
               height: 500px;
               border: 1px solid #000000;
               border-radius: 4px;
            `}
         >
            <div
               css={css`
                  padding: 10px;
               `}
            >
               {blog?.content}
            </div>
         </div>
         <div
            css={css`
               margin-top: 5px;
               width: 90%;
               border: 1px solid #000;
               border-radius: 4px;
            `}
         >
            <div
               css={css`
                  border-bottom: 1px solid #000;
                  padding: 10px;
                  cursor: pointer;
                  user-select: none;
               `}
               onClick={() => onClickPrevAndNext(NextAndPrev.Prev)}
            >
               이전글 : {prevBlog ? prevBlog.subject : '이전글 없음'}
            </div>
            <div
               css={css`
                  cursor: pointer;
                  padding: 10px;
                  user-select: none;
               `}
               onClick={() => onClickPrevAndNext(NextAndPrev.Next)}
            >
               다음글 : {nextBlog ? nextBlog.subject : '다음글 없음'}
            </div>
         </div>
      </div>
   );
};
