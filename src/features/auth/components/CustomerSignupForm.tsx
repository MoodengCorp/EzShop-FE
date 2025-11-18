import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter} from 'next/router';
import type { E164Number } from 'libphonenumber-js/core'
import { SignupFormData, UserRole } from '@/features/auth/types/auth'

const fields = [
  {
    fieldName: '아이디',
    name: 'email',
    placeholder: '아이디를 입력해주세요',
    type: 'email',
  },
  {
    fieldName: '이름',
    name: 'name',
    placeholder: '이름을 입력해주세요',
    type: 'text',
  },
  {
    fieldName: '비밀번호',
    name: 'password',
    placeholder: '비밀번호를 입력해주세요',
    type: 'password',
  },
  {
    fieldName: '비밀번호확인',
    name: 'passwordConfirm',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    type: 'password',
  },
  {
    fieldName: '주소',
    name: 'address',
    placeholder: '주소를 입력해주세요',
    type: 'text',
  },
  {
    fieldName: '상세 주소',
    name: 'address_detail',
    placeholder: '상세 주소를 입력해주세요',
    type: 'text',
  },
]

export function CustomerSignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    address: '',
    addressDetail: '',
    role: 'USER'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handlePhoneChange = (value: E164Number | undefined) => {
    setFormData(prev => ({
      ...prev,
      phone: value || ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (!formData.email || !formData.name || !formData.password || !formData.passwordConfirm || !formData.address || !formData.phone) {
      setError('모든 필수 항목을 입력해주세요.')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          address: formData.address,
          phone: formData.phone,
          role: "SELLER"
        }),
      })

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.')
      }

      alert('회원가입이 완료되었습니다!')
      router.push('/');

    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="whitespace-nowrap">
        <FieldSet className="w-[400px] mb-8 border-b-[1px] border-black">
          <FieldLegend className="text-center">
            <p className="text-2xl">회원가입</p>
          </FieldLegend>
          <FieldGroup>
            {fields.map((field, index) => {
              return (
                <Field key={index}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>{field.fieldName}</FieldLabel>
                    <Input
                      className="w-72"
                      id={field.name}
                      type={field.type}
                      autoComplete="off"
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Field>
              )
            })}
            <Field>
              <div className="flex items-center justify-between mb-6">
                <FieldLabel htmlFor="phone">전화번호</FieldLabel>
                <PhoneInput
                  className="w-72"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="KR"
                />
              </div>
            </Field>

          </FieldGroup>
        </FieldSet>
        <Field className="flex justify-center" orientation="horizontal">
          <Button
            type="submit"
            className="w-72 h-14 text-lg rounded-s bg-deepBlue hover:bg-deepBlue"
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '가입하기'}
          </Button>
        </Field>
      </div>
    </form>
  )
}