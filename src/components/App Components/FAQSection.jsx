import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Saylani Microfinance?</AccordionTrigger>
                        <AccordionContent>
                            Saylani Microfinance is a program by Saylani Welfare International Trust that provides small loans to
                            underprivileged individuals and small businesses to help them become financially independent.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I apply for a loan?</AccordionTrigger>
                        <AccordionContent>
                            You can apply for a loan by visiting our nearest branch or filling out an online application form on our
                            website. Our team will review your application and contact you for further steps.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is SMIT?</AccordionTrigger>
                        <AccordionContent>
                            SMIT (Saylani Mass IT Training) is a program that offers free IT education to youth. It provides courses
                            in web development, mobile app development, graphic design, and other in-demand IT skills.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How can I donate to Saylani?</AccordionTrigger>
                        <AccordionContent>
                            You can donate to Saylani through our website, mobile app, or by visiting any of our offices. We accept
                            various forms of donations, including cash, goods, and zakat.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>What other services does Saylani offer?</AccordionTrigger>
                        <AccordionContent>
                            In addition to microfinance and IT education, Saylani offers various services including free medical care,
                            food distribution, clean water projects, and disaster relief efforts.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

