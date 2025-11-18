import { useState } from 'react'
import { PasswordVerification } from './PasswordVerification'
import { ProfileEditForm } from './ProfileEditForm'

export function ProfilePage() {
  const [isVerified, setIsVerified] = useState(false)

  return (
    <div>
      {isVerified ? (
        <ProfileEditForm />
      ) : (
        <PasswordVerification onSuccess={() => setIsVerified(true)} />
      )}
    </div>
  )
}