// src/features/user/components/ProfileEditForm.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth'
import {
  useUpdateProfile,
  useUserProfile,
  useChangePassword,
} from '@/features/user/hooks/useUserProfile'
import { UpdateUserInfoFormData } from '@/features/user/types/user'

export function ProfileEditForm() {
  // 사용자 정보 조회
  const { data: userInfoResponse, isLoading: isFetching, error, isSuccess } = useUserProfile()
  const updateMutation = useUpdateProfile()
  const changePasswordMutation = useChangePassword()

  // 폼 상태 - 초기값을 반드시 빈 문자열로 설정 (제어 컴포넌트 유지)
  const [formData, setFormData] = useState<UpdateUserInfoFormData>({
    name: '',
    phone: '',
    address: '',
    addressDetail: '',
  })

  // 비밀번호 변경 상태 (선택적)
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  // 사용자 정보 불러오기 후 폼에 세팅
  useEffect(() => {
    if (userInfoResponse) {
      setFormData({
        name: userInfoResponse.data?.name || '',
        phone: userInfoResponse.data?.phone || '',
        address: userInfoResponse.data?.address || '',
        addressDetail: userInfoResponse.data?.addressDetail || '',
      })
    }
  }, [userInfoResponse])

  // 입력값 변경 핸들러
  const handleFormChange = (field: keyof UpdateUserInfoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  // 비밀번호 변경 검증
  const validatePasswordChange = (): string | null => {
    const { currentPassword, newPassword, newPasswordConfirm } = passwords

    // 비밀번호를 변경하려는 경우
    if (currentPassword || newPassword || newPasswordConfirm) {
      if (!currentPassword) {
        return '현재 비밀번호를 입력해주세요.'
      }
      if (!newPassword) {
        return '새 비밀번호를 입력해주세요.'
      }
      if (newPassword !== newPasswordConfirm) {
        return '새 비밀번호가 일치하지 않습니다.'
      }
      if (newPassword.length < 8) {
        return '비밀번호는 8자 이상이어야 합니다.'
      }
    }
    return null
  }

  // 정보 수정 제출
  const handleSubmit = async () => {
    // 비밀번호 검증
    const passwordError = validatePasswordChange()
    if (passwordError) {
      toast.error(passwordError, { position: 'top-center' })
      return
    }

    // 필수 정보 검증
    if (!formData.name.trim()) {
      toast.error('이름을 입력해주세요.', { position: 'top-center' })
      return
    }
    if (!formData.phone.trim()) {
      toast.error('휴대폰 번호를 입력해주세요.', { position: 'top-center' })
      return
    }

    try {
      // 1. 프로필 업데이트
      await updateMutation.mutateAsync(formData)

      // 2. 비밀번호 변경이 있다면 별도 API 호출
      if (passwords.currentPassword && passwords.newPassword) {
        await changePasswordMutation.mutateAsync({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        })

        // 비밀번호 변경 성공 후 입력 필드 초기화
        setPasswords({
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        })
      }
    } catch (error) {
      // 에러는 각 mutation의 onError에서 처리됨
      console.error('프로필/비밀번호 수정 실패:', error)
    }
  }

  // 회원 탈퇴
  const handleDeleteAccount = () => {
    if (
      confirm(
        '정말로 탈퇴하시겠습니까? 탈퇴 후에는 계정을 복구할 수 없습니다.'
      )
    ) {
      // TODO: 회원 탈퇴 API 호출
      toast.info('회원 탈퇴 기능은 준비 중입니다.', { position: 'top-center' })
    }
  }

  // 로딩 상태 확인
  const isSubmitting = updateMutation.isPending || changePasswordMutation.isPending

  if (isFetching) {
    return (
      <div className="flex w-[700px] flex-col gap-2 rounded-2xl bg-white px-4 py-4">
        <p className="text-center text-gray-600">사용자 정보를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    console.error('❌ 에러 발생:', error)
    return (
      <div className="flex w-[700px] flex-col gap-2 rounded-2xl bg-white px-4 py-4">
        <p className="text-center text-red-600">사용자 정보를 불러오는데 실패했습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex w-[700px] flex-col gap-2 rounded-2xl bg-white px-4 py-4">
      <p className="pb-2 font-semibold text-black">개인 정보 수정</p>
      <p className="font-semibold">회원정보</p>
      <Separator className="border-[1px] border-black bg-black" />

      <div className="flex flex-col gap-6 px-8 py-4 text-sm">
        {/* 이메일 (읽기 전용) */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">아이디(이메일)</p>
          <Input
            type="email"
            value={userInfoResponse?.data?.email || ''}
            disabled
            className="flex-1 bg-gray-100"
          />
        </div>

        {/* 이름 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">이름</p>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            placeholder="이름을 입력해주세요"
            className="flex-1"
          />
        </div>

        {/* 휴대폰 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">휴대폰</p>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleFormChange('phone', e.target.value)}
            placeholder="010-1234-5678"
            className="flex-1"
          />
        </div>

        {/* 주소 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">주소</p>
          <Input
            type="text"
            value={formData.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
            placeholder="주소를 입력해주세요"
            className="flex-1"
          />
        </div>

        {/* 상세 주소 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">상세 주소</p>
          <Input
            type="text"
            value={formData.addressDetail}
            onChange={(e) => handleFormChange('addressDetail', e.target.value)}
            placeholder="상세 주소를 입력해주세요"
            className="flex-1"
          />
        </div>
      </div>

      {/* 비밀번호 변경 섹션 */}
      <Separator className="my-4" />
      <p className="font-semibold">비밀번호 변경 (선택사항)</p>
      <p className="text-xs text-muted-foreground">
        비밀번호를 변경하지 않으려면 비워두세요.
      </p>

      <div className="flex flex-col gap-6 px-8 py-4 text-sm">
        {/* 현재 비밀번호 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">현재 비밀번호</p>
          <Input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              handlePasswordChange('currentPassword', e.target.value)
            }
            placeholder="현재 비밀번호를 입력해주세요"
            className="flex-1"
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">새 비밀번호</p>
          <Input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            placeholder="새 비밀번호를 입력해주세요 (8자 이상)"
            className="flex-1"
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="flex items-center gap-4">
          <p className="w-32 whitespace-nowrap font-semibold">
            새 비밀번호 확인
          </p>
          <Input
            type="password"
            value={passwords.newPasswordConfirm}
            onChange={(e) =>
              handlePasswordChange('newPasswordConfirm', e.target.value)
            }
            placeholder="새 비밀번호를 한 번 더 입력해주세요"
            className="flex-1"
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <Separator className="mb-6 mt-4" />

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleDeleteAccount}
          className="w-32 border-red-500 text-red-500 hover:bg-red-50"
        >
          회원 탈퇴
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-52 py-6"
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </Button>
      </div>
    </div>
  )
}