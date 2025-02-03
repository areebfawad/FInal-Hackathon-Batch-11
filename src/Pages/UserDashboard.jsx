import { Footer } from "../components/App Components/Footer";
import { LoanApplicationForm } from "../components/App Components/LoanApplicationForm";
import { Navbar } from "../components/App Components/Navbar";
import UserLayout from "../components/App Components/UserLayout";

export function UserDashboard() {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="mt-7 mb-5 text-center">Submit Your Loan Application</h1>
        <LoanApplicationForm />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </section>
  );
}
