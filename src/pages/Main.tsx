import Carousel from "../_components/Main/Carousel";
import Featured from "../_components/Featured";
import Communication from "../_components/Main/Communication";

const Main = () => {
    return (
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-8 justify-center my-8">
            <Carousel/>
            <Communication />
            <Featured/>
        </main>
    );
}
 
export default Main;