'use client';

import Main from '@/components/document/main';
import { useAppSelector } from '@/redux/storeHooks';


export default function DocumentHome() {
  const user = useAppSelector((state) => state?.auth?.user);
    if (user === null || user === undefined) {
      window.location.href = "/";
    }
  return (
    <>
    <Main />
   </>
  );
}
