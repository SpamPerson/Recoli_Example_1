/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IBlogData, PageType } from './common/common';
import { blogdataState, pageTypeState, readPageIndexState } from './common/store';

interface PWrite {
   index?: number;
}

export const Write: React.FC<PWrite> = (props) => {
   const [subject, setSubject] = useState<string>();
   const [content, setContent] = useState<string>();
   const [writer, setWriter] = useState<string>();
   const [blogDatas, setBlogDatas] = useRecoilState(blogdataState);
   const setPageType = useSetRecoilState(pageTypeState);
   //    const setReadPageIndex = useSetRecoilState(readPageIndexState);

   useEffect(() => {
      if (props.index !== -1) {
         const blogData = blogDatas.find((element) => element.index === props.index);
         setSubject(blogData?.subject);
         setContent(blogData?.content);
         setWriter(blogData?.writer);
      }
   }, [props.index]);

   const onChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(event.currentTarget.value);
   };

   const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.currentTarget.value);
   };

   const onClickCancel = () => {
      if (props.index !== -1) setPageType(PageType.Read);
      else setPageType(PageType.List);
   };

   const onClickSaveOrUpdate = () => {
      if (!subject) alert('제목을 입력하세요');
      else if (!content) alert('내용을 입력하세요');
      else if (!writer) alert('글쓴이를 입력하세요');
      else if (props.index !== -1) {
         let newDatas: IBlogData[] = [...blogDatas];
         const data: IBlogData = newDatas.find((element) => element.index === props.index)!;
         newDatas.splice(
            newDatas.findIndex((element) => element.index === props.index),
            1,
            { ...data, subject: subject, content: content }
         );
         setBlogDatas(newDatas);
         setPageType(PageType.Read);
      } else {
         let newDatas: IBlogData[] = [...blogDatas];
         const data: IBlogData = {
             index:newDatas.length + 1,
             content: content,
             count:0,
             subject:subject,
             writer:writer
         };
         newDatas.push(data);
         setBlogDatas(newDatas);
         setPageType(PageType.List);
      }
   };

   const Button = styled.button`
      padding: 10px;
   `;

   return (
      <div
         css={css`
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
         `}
      >
         <div
            css={css`
               display: flex;
               align-items: end;
               flex-direction: column;
               margin-top: 30px;
               width: 90%;
            `}
         >
            {props.index !== -1 ? (
               `글쓴이: ${writer}`
            ) : (
               <input
                  onChange={(event) => {
                     setWriter(event.currentTarget.value);
                  }}
                  placeholder="글쓴이"
                  css={css`
                     height: 30px;
                     width: 100px;
                  `}
               />
            )}
         </div>
         <div
            css={css`
               margin-top: 5px;
               display: flex;
               align-items: center;
               width: 90%;
               font-size: 20px;
            `}
         >
            <input
               css={css`
                  height: 30px;
                  width: 100%;
               `}
               defaultValue={subject}
               onChange={onChangeSubject}
               placeholder="제목을 입력하세요"
            />
         </div>
         <div
            css={css`
               display: flex;
               margin-top: 10px;
               width: 90%;
               font-size: 20px;
               align-items: center;
            `}
         >
            <textarea
               css={css`
                  width: 100%;
                  height: 200px;
                  resize: none;
               `}
               placeholder={'내용을 입력해 주세요'}
               defaultValue={content}
               onChange={onChangeContent}
            />
         </div>
         <div
            css={css`
               width: 90%;
               margin-top: 10px;
               text-align: end;
            `}
         >
            <Button
               css={css`
                  margin-right: 10px;
               `}
               onClick={onClickSaveOrUpdate}
            >
               {props.index !== -1 ? '수정' : '저장'}
            </Button>
            <Button onClick={onClickCancel}>취소</Button>
         </div>
      </div>
   );
};
