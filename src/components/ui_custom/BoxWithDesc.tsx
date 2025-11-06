import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { TextGray } from '@/components/ui_custom/TextGray'

type BoxWithDescProps = {
  title: string,
  descriptions: string[][],
}

export function BoxWithDesc({ title, descriptions }: BoxWithDescProps) {
  return (
    <div className="flex gap-4 border-gray-400">
      <Item variant="outline" className="py-2 rounded-s">
        <ItemContent className="flex items-center w-28">
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
      </Item>
      <TextGray descriptions={descriptions}></TextGray>
    </div>
  )
}
