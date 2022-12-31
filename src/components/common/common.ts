
export interface IBlogData {
    index:number // 순서
    subject?:string, // 제목
    writer?:string, // 글쓴이
    content?:string, // 내용
    count?:number // 작성일자
}

export const defaultBlogDatas: IBlogData[] = [
    {index:1,subject:'첫번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 첫번쨰 글입니다.', count:0},
    {index:2,subject:'두번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 두번째 글입니다.', count:0},
    {index:3,subject:'세번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 세번쨰 글입니다.', count:0},
    {index:4,subject:'네번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 네번쨰 글입니다.', count:0},
    {index:5,subject:'다섯번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 다섯번쨰 글입니다.', count:0},
    {index:6,subject:'여섯번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 여섯번쨰 글입니다.', count:0},
    {index:7,subject:'일곱번째 기본 글입니다.', writer: 'SpamPerson', content:'안녕하세요 일곱번쨰 글입니다.', count:0},
]

export const enum PageType {
    List = 'list',
    Read = 'read',
    Write = 'write',
}