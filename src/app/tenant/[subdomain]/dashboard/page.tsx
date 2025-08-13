import ClientDashboard from './ClientDashboard'

interface DashboardPageProps {
  params: Promise<{
    subdomain: string
  }>
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const { subdomain } = await params
  
  return <ClientDashboard subdomain={subdomain} />
}

export default DashboardPage