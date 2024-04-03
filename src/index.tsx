import { Link } from "react-router-dom";

function homePage() {
    return (
        <div className="container-fluid">
            <div id="app">
                <div>
                    <h1> Attrapez-les tous !</h1>
                    <hr />

                    <button className="btn btn-primary">
                        <Link to={'display.tsx'}> 
                        Fetch Pokemons
                        </Link>
                    </button>


                </div>
            </div>
        </div>
    );
}

export default homePage;