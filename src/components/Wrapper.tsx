/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PageType } from './common/common';
import { pageTypeState, readPageIndexState, updatePageIndexState } from './common/store';
import { List } from './List';
import { Read } from './Read';
import { Write } from './Write';

const Wrapper: React.FC = () => {
   const pageType = useRecoilValue(pageTypeState);
   const readPageIndex = useRecoilValue(readPageIndexState);
   const updatePageIndex = useRecoilValue(updatePageIndexState);
   const view = useMemo(()=>{
      switch(pageType){
         case PageType.List:
            return <List/>;
         case PageType.Read:
            return <Read index={readPageIndex!}/>
         case PageType.Write:
            return <Write index={updatePageIndex}/>
      }
   },[pageType,readPageIndex,updatePageIndexState])

   return view;
};

export default Wrapper;
