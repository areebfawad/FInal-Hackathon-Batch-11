import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import AdminLayout from "../components/App Components/AdminLayout"

export default function AdminDashboard() {
    const [analyticsData, setAnalyticsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://smit-final-hackaton-backend-production-da72.up.railway.app/api/loan/getAllRequest")
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }
                let users = await fetch("https://smit-final-hackaton-backend-production-da72.up.railway.app/api/auth/allUsers")
                users = await users.json()
                console.log(users, "usrs");

                const data = await response.json()
                console.log(data);

                const requests = data.data
                users = users.data

                const analytics = {
                    totalRequests: requests.length,
                    pendingRequests: requests.filter((r) => r.status === "Pending").length,
                    acceptedRequests: requests.filter((r) => r.status === "Approved").length,
                    rejectedRequests: requests.filter((r) => r.status === "Rejected").length,
                    totalUsers: users.length,
                }

                setAnalyticsData(analytics)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
                console.log(err, "error");

            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <LoadingSkeleton />
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>
    }

    if (!analyticsData) {
        return <div className="text-center mt-8">No data available</div>
    }

    const chartData = [
        { name: "Pending", value: analyticsData.pendingRequests },
        { name: "Accepted", value: analyticsData.acceptedRequests },
        { name: "Rejected", value: analyticsData.rejectedRequests },
    ]

    return (
        <AdminLayout>

            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnalyticsCard title="Total Requests" value={analyticsData.totalRequests} />
                    <AnalyticsCard title="Pending Requests" value={analyticsData.pendingRequests} />
                    <AnalyticsCard title="Accepted Requests" value={analyticsData.acceptedRequests} />
                    <AnalyticsCard title="Rejected Requests" value={analyticsData.rejectedRequests} />
                    <AnalyticsCard title="Total Users" value={analyticsData.totalUsers} />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Requests Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#2563EB" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}

function AnalyticsCard({ title, value }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}

function LoadingSkeleton() {

    return (
        <AdminLayout>

            <div className="space-y-8">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-4 w-[100px]" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-[60px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}

