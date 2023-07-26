import FormButtons from '@/components/Home/FormButtons'
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormButtons />
    </main>
  )
}

export default Home