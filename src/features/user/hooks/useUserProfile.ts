import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/features/user/api/userApi'
import { toast } from 'sonner'
import { userKeys } from '@/features/user/api/queryKeys'

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getProfile,
    staleTime: 10 * 60 * 1000,
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile()})
      toast.success('프로필이 수정되었습니다.', {
        position: 'top-center'
      })
    }
  })
}

export const useVerifyPassword = () => {
  return useMutation({
    mutationFn: userApi.verifyPassword,
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.', {
        position: 'top-center'
      })
    },
    onError: (error: any) => {
      const message = error.message || '비밀번호 변경에 실패했습니다'
      toast.error(message, {
        position: 'top-center',
      })
    }
  })
}