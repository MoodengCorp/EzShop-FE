import { Separator } from '@/components/ui/separator'

export function TextGray({descriptions} : {descriptions: string[][]}) {
  return (
    <div>
      {descriptions.map((desc, index) => {
        return (
          <div key={index} className="flex text-xs gap-1 items-center text-muted-foreground">
            {desc[0]}
            {desc.length === 2 && (
              <>
                <Separator orientation="vertical" className="h-3 bg-gray-300" />
                {desc[1]}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}