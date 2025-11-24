import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthButtons() {

    return (
        <div className="flex flex-col gap-4">
            <Button asChild size={"lg"} variant={"default"}>
                <Link href="/login">Sign into your Account</Link>
            </Button>

            <Button asChild size={"lg"} variant={"default"}>
                <Link href="/sign-up">Create Account</Link>
            </Button>
        
        </div>
    );

}