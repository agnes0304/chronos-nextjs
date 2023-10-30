import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { title } = router.query

  return (
    <div>
      <h1>{title}</h1>
      {/* Your post content here */}
    </div>
  )
}
