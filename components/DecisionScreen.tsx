import { Card } from "./ui/card";

export default function DecisionScreen() {

    return (
    <section className="flex items-center justify-center w-full py-10 max-w-4xl mx-auto bg-amber-900">
        <Card className="flex flex-col items-center justify-center p-14 w-full max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-semibold">Welcome to Gardemic!</h1>
        </Card>
    </section>
    )

};