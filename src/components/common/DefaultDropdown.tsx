import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

type dropdownElement = {
  dropdownItemName: string
  dropdownItemLink: string
  onClickAction?: () => void
}

type defaultDropDownProps = {
  title?: string
  dropdownItemElements: dropdownElement[]
}

export default function DefaultDropdown({
  title,
  dropdownItemElements,
}: defaultDropDownProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{title}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {/*<DropdownMenuLabel>{title}</DropdownMenuLabel>*/}
          {/*<DropdownMenuSeparator />*/}
          {dropdownItemElements.map((item) => (
              <Link
                key={item.dropdownItemName}
                href={item.dropdownItemLink}
                {...(item.onClickAction && { onClick: item.onClickAction })}
              >
                <DropdownMenuItem>{item.dropdownItemName}</DropdownMenuItem>
              </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
