import Link from 'next/link'

export default () =>
  <div>
    <h1>Thank you for your order!</h1>
    <Link href={`/`}>
      <a>Return Home</a>
    </Link>
  </div>
