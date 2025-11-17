import MyPageLayout from '@/components/layout/MyPageLayout'
import { ProtectedRoute } from '@/guards/ProtectedRoute'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types/api'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth/store/authStore'

// 사용자 정보 타입
interface UserInfo {
  email: string
  name: string
  phone: string
  address?: string
  addressDetail?: string
}

// 사용자 정보 수정 요청 타입
interface UpdateUserInfoRequest {
  currentPassword?: string
  newPassword?: string
  newPasswordConfirm?: string
  name: string
  phone: string
  address?: string
  addressDetail?: string
}

export default function ProfilePage() {
  const [password, setPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePasswordCheck = async () => {
    // 입력값 검증
    if (password.trim() === '') {
      setError('비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.post<ApiResponse<void>>(
        '/user/passwordcheck',
        { password }
      )

      if (response.success) {
        setPasswordMatch(true)
        toast.success('비밀번호가 확인되었습니다.')
      } else {
        setError(response.error?.message || '비밀번호가 일치하지 않습니다.')
        toast.error('비밀번호가 일치하지 않습니다.')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.message || '비밀번호 확인 중 오류가 발생했습니다.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <MyPageLayout>
        {passwordMatch ? (
          <AfterPasswordMatchProfile />
        ) : (
          <BeforePasswordMatchProfile
            password={password}
            setPassword={setPassword}
            onSubmit={handlePasswordCheck}
            isLoading={isLoading}
            error={error}
          />
        )}
      </MyPageLayout>
    </ProtectedRoute>
  )
}

// 비밀번호 확인 전 컴포넌트
interface BeforePasswordMatchProfileProps {
  password: string
  setPassword: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  error: string | null
}

export function BeforePasswordMatchProfile({
                                             password,
                                             setPassword,
                                             onSubmit,
                                             isLoading,
                                             error,
                                           }: BeforePasswordMatchProfileProps) {
  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
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
              onKeyDown={handleKeyDown}
              placeholder="현재 비밀번호를 입력해주세요."
              disabled={isLoading}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      <Button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="mx-auto w-52 py-6"
      >
        {isLoading ? '확인 중...' : '확인'}
      </Button>
    </div>
  )
}

// 비밀번호 확인 후 프로필 수정 컴포넌트
export function AfterPasswordMatchProfile() {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    name: '',
    phone: '',
    address: '',
    addressDetail: '',
  })

  // 비밀번호 변경 상태
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsFetching(true)
      try {
        const response = await apiClient.get<ApiResponse<UserInfo>>(
          '/user/info'
        )

        if (response.success && response.data) {
          setUserInfo(response.data)
        } else {
          toast.error('사용자 정보를 불러오는데 실패했습니다.')
        }
      } catch (err: any) {
        toast.error(
          err.response?.message || '사용자 정보를 불러오는데 실패했습니다.'
        )
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserInfo()
  }, [])

  // 입력값 변경 핸들러
  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }))
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
      toast.error(passwordError)
      return
    }

    // 필수 정보 검증
    if (!userInfo.name.trim()) {
      toast.error('이름을 입력해주세요.')
      return
    }
    if (!userInfo.phone.trim()) {
      toast.error('휴대폰 번호를 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const updateData: UpdateUserInfoRequest = {
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        addressDetail: userInfo.addressDetail,
      }

      // 비밀번호 변경이 있는 경우 추가
      if (passwords.currentPassword && passwords.newPassword) {
        updateData.currentPassword = passwords.currentPassword
        updateData.newPassword = passwords.newPassword
        updateData.newPasswordConfirm = passwords.newPasswordConfirm
      }

      const response = await apiClient.patch<ApiResponse<void>>(
        '/user/info',
        updateData
      )

      if (response.success) {
        toast.success('회원 정보가 수정되었습니다.')
        router.push('/')
      } else {
        toast.error(response.error?.message || '정보 수정에 실패했습니다.')
      }
    } catch (err: any) {
      toast.error(
        err.response?.message || '정보 수정 중 오류가 발생했습니다.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // 회원 탈퇴
  const handleWithdraw = async () => {
    if (
      !confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')
    ) {
      return
    }

    setIsLoading(true)

    try {
      // 1. 회원 탈퇴 요청
      const signoutResponse = await apiClient.delete<ApiResponse<void>>(
        '/user/signout'
      )

      if (!signoutResponse.success) {
        toast.error(
          signoutResponse.error?.message || '회원 탈퇴에 실패했습니다.'
        )
        return
      }

      // 2. 로그아웃 요청 (인증 정보 제거)
      try {
        await apiClient.get<ApiResponse<void>>('/user/logout')
      } catch (logoutErr) {
        // 로그아웃 실패해도 클라이언트 측 정보는 제거
        console.error('로그아웃 요청 실패:', logoutErr)
      }

      // 3. 클라이언트 측 인증 정보 제거
      logout()

      // 4. 성공 메시지 및 메인 페이지 이동
      toast.success('회원 탈퇴가 완료되었습니다.')
      router.push('/')
    } catch (err: any) {
      toast.error(
        err.response?.message || '회원 탈퇴 중 오류가 발생했습니다.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex w-[700px] items-center justify-center rounded-2xl bg-white px-4 py-20">
        <p className="text-muted-foreground">정보를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="flex w-[700px] flex-col gap-8 rounded-2xl bg-white px-4 py-4">
      <p className="pb-2 font-semibold text-black">개인 정보 수정</p>

      <div className="ml-8 flex flex-col gap-4 text-sm">
        {/* 이메일 (읽기 전용) */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">이메일</p>
          <Input
            className="w-72"
            value={userInfo.email}
            disabled
            placeholder="이메일"
          />
        </div>

        {/* 현재 비밀번호 */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">
            현재 비밀번호
          </p>
          <Input
            type="password"
            className="w-72"
            value={passwords.currentPassword}
            onChange={(e) =>
              handlePasswordChange('currentPassword', e.target.value)
            }
            placeholder="현재 비밀번호를 입력해주세요"
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">
            새 비밀번호
          </p>
          <Input
            type="password"
            className="w-72"
            value={passwords.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            placeholder="새 비밀번호를 입력해주세요"
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">
            새 비밀번호 확인
          </p>
          <Input
            type="password"
            className="w-72"
            value={passwords.newPasswordConfirm}
            onChange={(e) =>
              handlePasswordChange('newPasswordConfirm', e.target.value)
            }
            placeholder="새 비밀번호를 다시 입력해주세요"
          />
        </div>

        {/* 이름 */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">이름</p>
          <Input
            className="w-72"
            value={userInfo.name}
            onChange={(e) => handleUserInfoChange('name', e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        </div>

        {/* 휴대폰 */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">휴대폰</p>
          <Input
            className="w-72"
            value={userInfo.phone}
            onChange={(e) => handleUserInfoChange('phone', e.target.value)}
            placeholder="휴대폰 번호를 입력해주세요"
          />
        </div>

        {/* 주소 (선택사항) */}
        <div className="flex items-center">
          <p className="mr-20 w-32 whitespace-nowrap font-semibold">주소</p>
          <Input
            className="w-72"
            value={userInfo.address}
            onChange={(e) => handleUserInfoChange('address', e.target.value)}
            placeholder="주소를 입력해주세요"
          />
        </div>

        {/* 상세주소 (선택사항) */}
        {/*<div className="flex items-center">*/}
        {/*  <p className="mr-20 w-32 whitespace-nowrap font-semibold">*/}
        {/*    상세주소*/}
        {/*  </p>*/}
        {/*  <Input*/}
        {/*    className="w-72"*/}
        {/*    value={userInfo.addressDetail}*/}
        {/*    onChange={(e) =>*/}
        {/*      handleUserInfoChange('addressDetail', e.target.value)*/}
        {/*    }*/}
        {/*    placeholder="상세주소를 입력해주세요"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>

      <Separator className="border-[1px] border-black bg-black" />

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          onClick={handleWithdraw}
          disabled={isLoading}
          className="border-[1px] border-deepBlue bg-white px-9 text-deepBlue hover:bg-gray-50"
        >
          탈퇴하기
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-deepBlue px-6"
        >
          {isLoading ? '수정 중...' : '회원정보수정'}
        </Button>
      </div>
    </div>
  )
}