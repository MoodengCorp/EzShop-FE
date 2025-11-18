import React, { useState } from 'react'
import { useVerifyPassword } from '@/features/user/hooks/useUserProfile'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  onSuccess: () => void
}

export function PasswordVerification({ onSuccess }: Props) {
  const [password, setPassword] = useState('')
  const verifyMutation = useVerifyPassword()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await verifyMutation.mutateAsync({ password })
      onSuccess()
    } catch (error) {}
  }
  return (
    <div className="flex w-[700px] flex-col gap-2 rounded-2xl bg-white px-4 py-4">
      <p className="pb-2 font-semibold text-black">개인 정보 수정</p>
      <p className="font-semibold">비밀번호 재확인</p>
      <p className="text-xs text-muted-foreground">
        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번
        확인해주세요.
      </p>
      <Separator className="border-[1px] border-black bg-black" />

      <div className="flex flex-col gap-6 px-8 py-4 text-sm">
        <div className="flex items-center gap-4">
          <p className="mr-20 w-20 whitespace-nowrap">비밀번호</p>
          <div className="flex-1">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력해주세요."
              disabled={verifyMutation.isPending}
            />
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={verifyMutation.isPending}
        className="mx-auto w-52 py-6"
      >
        확인
      </Button>
    </div>
  )
}
