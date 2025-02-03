import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, GraduationCap, Users } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<CreditCard className="w-10 h-10" />}
            title="Microfinance Loans"
            description="Affordable installment-based loans to support small businesses and entrepreneurs."
          />
          <ServiceCard
            icon={<GraduationCap className="w-10 h-10" />}
            title="Free IT Education"
            description="SMIT offers free courses in various IT fields to empower the youth with in-demand skills."
          />
          <ServiceCard
            icon={<Users className="w-10 h-10" />}
            title="Community Support"
            description="Various programs to assist needy individuals in our communities, including healthcare and food distribution."
          />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

