import { toast } from 'sonner'

type LoginSuccessResponse = {
  success: true;
  data: {
    accessToken: string;
    // refreshToken: string;
    user: {
      email: string;
    };
  };
};

// 에러 응답
type LoginErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

// 유니온 타입으로 결합
type LoginResponse = LoginSuccessResponse | LoginErrorResponse;


export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const response = await fetch('http://localhost:8080/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  const data: LoginResponse = await response.json();

  if (data.success) {
    toast.info("로그인되었습니다!", {
      position: "top-center"
    })
    localStorage.setItem("accessToken", data.data.accessToken);
    return true;
  } else {
    toast.error(data.error.message, {
      position: "top-center"
    })
    return false;
  }
}
