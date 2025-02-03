"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import AdminLayout from "../components/App Components/AdminLayout"



export default function AdminLoanRequestsPage() {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://hackathon-backend-production-6a74.up.railway.app/api/loan/getAllRequest")
        if (!response.ok) throw new Error("Failed to fetch loan requests")
        const data = await response.json()
        setRequests(data.data)
        setFilteredRequests(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  useEffect(() => {
    const filtered = requests.filter((request) => {
      return statusFilter === "All" || request.status === statusFilter
    })
    setFilteredRequests(filtered)
  }, [statusFilter, requests])

  const handleStatusChange = async (requestId, newStatus) => {
    // TODO: Implement API call to update status
    console.log(`Updating status for request ${requestId} to ${newStatus}`)

    // For now, we'll update the status locally
    const updatedRequests = requests.map((request) =>
      request._id === requestId ? { ...request, status: newStatus } : request,
    )
    setRequests(updatedRequests)
  }

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>
  if (error) return <AdminLayout><div>Error: {error}</div></AdminLayout>

  return (
       <AdminLayout>
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Loan Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status-filter">Status</Label>
              <Select onValueChange={setStatusFilter} defaultValue="All">
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Initial Deposit</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Loan Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>{request.subcategory}</TableCell>
                  <TableCell>${request.initialDeposit.toFixed(2)}</TableCell>
                  <TableCell>${request.loanAmount.toFixed(2)}</TableCell>
                  <TableCell>{request.loanPeriod} days</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <LoanDetailsDialog request={request} />
                      {request.status === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleStatusChange(request._id, "Approved")}
                            variant="default"
                            size="sm"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleStatusChange(request._id, "Rejected")}
                            variant="destructive"
                            size="sm"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  )
}

function LoanDetailsDialog({ request }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Loan Request Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">General Information</h3>
            <p>Category: {request.category}</p>
            <p>Subcategory: {request.subcategory}</p>
            <p>Initial Deposit: ${request.initialDeposit.toFixed(2)}</p>
            <p>Loan Amount: ${request.loanAmount.toFixed(2)}</p>
            <p>Loan Period: {request.loanPeriod} days</p>
            <p>Status: {request.status}</p>
            <p>Created At: {new Date(request.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Guarantors</h3>
            <ul>
              {request.guarantors.map((guarantor) => (
                <li key={guarantor._id}>{guarantor.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mt-4">Payment Breakdown</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {request.breakdown.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

