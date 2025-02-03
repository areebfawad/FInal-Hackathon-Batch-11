import {Link} from "react-router"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    
    return (
        <section className="bg-primary text-white py-20 min-h-[90vh] flex justify-center items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Empowering Communities Through Microfinance</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Saylani Welfare International Trust provides installment-based loans and free IT education to uplift the
                        underprivileged.
                    </p>
                    <div className="space-x-4">
                        <Link to="/applyFormPage" className="bg-white text-primary px-6 py-3 rounded-full font-semibold">
                            {/* <Button size="lg" variant="secondary"> */}
                                Apply for a Loan
                            {/* </Button> */}
                        </Link>
                        {/* <Link href="/donate">
                            <Button size="lg" variant="outline">
                                Donate Now
                            </Button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

