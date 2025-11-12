import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TextGray } from '@/components/ui_custom/TextGray'
import { useEffect, useState } from 'react'
import { login } from '@/lib/api/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/hooks/useAuth'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoggingIn, loginError, isAuthenticated } = useAuth();

  useEffect(() => {
    if(isAuthenticated){
      router.push('/');
    }
  }, [isAuthenticated, router])

  const handleLoginClick = async () => {
    if(email.trim() === "") return;
    if(password.trim() === "") return;
    login({ email, password });
  };

  return (
    <>
      <div className="mx-auto flex w-80 flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-bold">로그인</h2>
        <div className="mb-2 flex w-80 flex-col gap-4">
          <Input
            id={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-6"
            type="email"
            placeholder="example@abc.com"
            disabled={isLoggingIn}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-6" type="password" placeholder="password" />
          <div className="flex w-full items-end justify-end">
            <TextGray descriptions={[['아이디 찾기', '비밀번호 찾기']]} />
          </div>
          {loginError && (
            <Alert variant="destructive">
              <AlertDescription>{loginError.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleLoginClick} className="h-10 w-80 bg-deepBlue py-6 hover:bg-muted-foreground hover:bg-deepBlue">로그인</Button>
          <Button className="h-10 w-80 border-[1px] border-deepBlue bg-white py-6 text-blue-300 hover:bg-white">
            <Link href="/auth/Signup">회원가입</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
