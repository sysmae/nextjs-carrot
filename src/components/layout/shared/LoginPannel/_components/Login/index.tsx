import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

interface Props {
  handleSetType: (type?: 'login' | 'signup') => void
}

export default function Login({ handleSetType }: Props) {
  return (
    <form className="my-2 flex flex-col gap-2 w-full" action="">
      <Input name="email" type="email" placeholder="이메일" required />
      <Input name="password" type="password" placeholder="비밀번호" required />

      <div className="flex flex-col gap-2 w-full">
        <Button type="submit" outline>
          로그인
        </Button>
        <Button type="button" onClick={() => handleSetType('signup')}>
          회원가입
        </Button>
      </div>
    </form>
  )
}
