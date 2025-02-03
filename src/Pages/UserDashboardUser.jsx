
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import UserLayout from "@/components/App Components/UserLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate } from "react-router"


export default function UserDashboardUser() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
let navigate = useNavigate();
  useEffect(() => {
    let currentUser = localStorage.getItem("auth-token")
    if (!currentUser) {
      navigate("/login")
    }
    const decodedToken = jwtDecode(currentUser)
    console.log(decodedToken , "decode token");
    
    if (decodedToken.role == "admin") {
      navigate("/admin")
    }
    if (decodedToken.role == "user") {
      if(!decodedToken.isPasswordReset){
        navigate("/resetPassword")
      }
    } else {
      navigate("/login")
    }
  },[])



  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        if (!token) {
          throw new Error("No auth token found")
        }

        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id

        const response = await fetch(`https://smit-final-hackaton-backend-production-da72.up.railway.app/api/loan/getuserRequest/${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }

        const data = await response.json()
        setApplications(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) {
    return (
      <UserLayout>
        <div className="text-center mt-8">Loading...</div>
      </UserLayout>
    )
  }

  if (error) {
    return (
      <UserLayout>
        <div className="text-center mt-8 text-red-500">{error}</div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Your Submitted Applications</h1>
        {applications?.map((application) => (
          <ApplicationCard
            key={application._id}
            application={application}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>
    </UserLayout>
  )
}

function ApplicationCard({
  application,
  currentPage,
  setCurrentPage,
}) {
       const itemsPerPage = 5
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const totalPages = application.breakdown ? Math.ceil(application.breakdown.length / itemsPerPage) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {application.category} - {application.subcategory}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Initial Deposit:</strong> ${application.initialDeposit.toFixed(2)}
          </div>
          <div>
            <strong>Loan Amount:</strong> ${application.loanAmount.toFixed(2)}
          </div>
          <div>
            <strong>Loan Period:</strong> {application.loanPeriod} days
          </div>
          <div>
            <strong>Status:</strong> {application.status}
          </div>
        </div>
        {application.status === "Accepted" && application.breakdown && (
          <>
            <h3 className="text-xl font-semibold mb-2">Payment Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {application.breakdown.slice(startIndex, endIndex).map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </CardContent>
    </Card>
  )
}

