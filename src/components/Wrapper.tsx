/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PageType } from './common/common';
import { pageTypeState } from './common/store';
import { List } from './List';
import { Read } from './Read';
import { Write } from './Write';

const Wrapper: React.FC = () => {
   const pageType = useRecoilValue(pageTypeState);

   const view = useMemo(()=>{
      switch(pageType){
         case PageType.List:
            return <List/>;
         case PageType.Read:
            return <Read/>
         case PageType.Write:
            return <Write/>
      }
   },[pageType])

   return view;
};

export default Wrapper;
