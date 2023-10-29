import { useRouteError } from "react-router-dom";
import './Error.css'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <center>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <p><a href="http://localhost:3000/"><i>Home Page</i></a></p>
            </center>
        </div>
    );
}
