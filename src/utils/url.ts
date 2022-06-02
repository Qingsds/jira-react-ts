import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from '.'

/**
 *
 * @param keys
 * @returns url 中指定键的参数
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
   /* 返回一个 searchParams 对象 */
   const [searchParams] = useSearchParams()
   const setSearchParams = useSetUrlQueryParams()
   return [
      /* 将url参数转换为对象 */
      useMemo(
         () =>
            keys.reduce((prev, key) => {
               return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string }),
         // eslint-disable-next-line react-hooks/exhaustive-deps
         [searchParams]
      ),
      /*  */
      (params: { [key in K]?: unknown }) => {
         setSearchParams(params)
      },
   ] as const
}

export const useSetUrlQueryParams = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
         ...Object.fromEntries(searchParams),
         ...params,
      }) as URLSearchParamsInit
      setSearchParams(o)
   }
}
