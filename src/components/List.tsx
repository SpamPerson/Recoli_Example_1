/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IBlogData } from "./common/common";
import { blogdataState, pageTypeState } from "./common/store";

export const List: React.FC = () => {
   const setPageType = useSetRecoilState(pageTypeState);
   const [blogData, setblogData] = useRecoilState(blogdataState);

   const Td = styled.td`
      border-right: 1px solid #000;
      text-align: center;
   `;

   const Button = styled.button`
      width: 100px;
   `;

   const onClickWrite = () => {};

   const onClickContent = (data: IBlogData) => {
      let newData: IBlogData[] = [...blogData];
      newData.splice(
         newData.findIndex((element) => element.index === data.index),
         1,
         { ...data, count: data.count! + 1 }
      );
      setblogData(newData);
   };
   return (
      <div
         css={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
         `}
      >
         <div
            css={css`
               display: flex;
               align-items: end;
               width: 90%;
               justify-content: end;
            `}
         >
            <Button onClick={onClickWrite}>글쓰기</Button>
         </div>
         <table
            css={css`
               margin-top: 5px;
               border: 1px solid #000;
               width: 90%;
               border-collapse: collapse;
            `}
         >
            <tr
               css={css`
                  border: 1px solid #000;
                  height: 50px;
                  font-weight: bold;
               `}
            >
               <Td>번호</Td>
               <Td>제목</Td>
               <Td>글쓴이</Td>
               <Td>조회수</Td>
            </tr>
            {blogData.map((value, index) => (
               <tr
                  key={index}
                  css={css`
                     border-bottom: 1px solid #000;
                     height: 30px;
                  `}
               >
                  <Td>{value.index}</Td>
                  <Td>
                     <a
                        css={css`
                           text-decoration: none;
                           color: black;
                           cursor: pointer;
                           &:hover {
                              color: #e0e0e0;
                              font-weight: bold;
                           }
                        `}
                        onClick={() => onClickContent(value)}
                     >
                        {value.subject}
                     </a>
                  </Td>
                  <Td>{value.writer}</Td>
                  <Td>{value.count}</Td>
               </tr>
            ))}
         </table>
      </div>
   );
};
