import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UserLayout from "./UserLayout"

export default function LoanRequestsPageUser() {
    const [loanRequests, setLoanRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLoanRequests = async () => {
            try {
                const token = localStorage.getItem("auth-token")
                if (!token) {
                    throw new Error("No auth token found")
                }
                console.log("token", token)
                const decodedToken = jwtDecode(token)
                const userId = decodedToken.id
                console.log(userId, "userid");
                console.log(decodedToken, "decode token");


                const response = await fetch(`https://smit-final-hackaton-backend-production-da72.up.railway.app/api/loan/getuserRequest/${userId}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch loan requests")
                }


                const data = await response.json()
                console.log(data);

                setLoanRequests(data.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchLoanRequests()
    }, [])

    if (loading) {
        return <UserLayout><div className="text-center mt-8">Loading...</div></UserLayout>
    }

    if (error) {
        return <UserLayout><div className="text-center mt-8 text-red-500">{error}</div></UserLayout>
    }

    if (loanRequests.length == 0) {
        return <UserLayout><div className="text-center flex justify-center items-center min-h-screen mt-10">
            No Request To Show
        </div>
        </UserLayout>
    }

    return (
        <UserLayout>

            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Loan Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Request Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loanRequests?.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.id}</TableCell>
                                        <TableCell>${request.amount.toFixed(2)}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    )
}

