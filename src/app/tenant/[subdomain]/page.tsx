import ClientTenantPage from './ClientTenantPage'

interface TenantPageProps {
  params: Promise<{
    subdomain: string
  }>
}

const TenantPage = async ({ params }: TenantPageProps) => {
  const { subdomain } = await params
  
  return <ClientTenantPage subdomain={subdomain} />
}

export default TenantPage
