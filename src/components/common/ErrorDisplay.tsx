import { ApiError } from '@/types/api'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface Props {
  error: unknown
  title?: string
  onRetry?: () => void
}

export function ErrorDisplay({ error, title = '오류가 발생했습니다', onRetry }: Props) {
  const message = error instanceof ApiError ? error.message : '알 수 없는 오류'

  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{message}</p>
        {onRetry && (
          <Button onClick={onRetry} size="sm" className="mt-2">
            다시 시도
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}