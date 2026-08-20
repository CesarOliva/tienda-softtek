import { Section } from "lucide-react";
import Communication from "../_components/Communication";
import Featured from "../_components/Featured";

const Main = () => {
    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center my-8">
            <Communication/>
            <Featured/>
        </main>
    );
}
 
export default Main;