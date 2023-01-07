import { atom } from "recoil";
import { defaultBlogDatas, PageType } from "./common";

export const blogdataState = atom({
    key:'blogdataState',
    default: defaultBlogDatas,
})

export const pageTypeState = atom({
    key:'pageType',
    default: PageType.List
})

export const readPageIndexState = atom({
    key:'pageIndex',
    default: -1,
})

export const updatePageIndexState = atom({
    key: 'updatePageIndex',
    default:-1,
})