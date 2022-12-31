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