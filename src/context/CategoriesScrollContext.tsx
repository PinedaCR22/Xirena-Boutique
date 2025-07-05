import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from 'react'

export type CategoriesHandle = {
  scrollToCategory: (cat: string) => void
}

type ContextType = {
  register: (ref: CategoriesHandle) => void
  scrollTo: (cat: string) => void
}

const CategoriesScrollContext = createContext<ContextType>({
  register: () => {},
  scrollTo: () => {},
})

export const useCategoriesScroll = () => useContext(CategoriesScrollContext)

export function CategoriesScrollProvider({ children }: { children: ReactNode }) {
  const ref = useRef<CategoriesHandle | null>(null)

  const register = (instance: CategoriesHandle) => {
    ref.current = instance
  }

  const scrollTo = (category: string) => {
    ref.current?.scrollToCategory(category)
  }

  return (
    <CategoriesScrollContext.Provider value={{ register, scrollTo }}>
      {children}
    </CategoriesScrollContext.Provider>
  )
}
