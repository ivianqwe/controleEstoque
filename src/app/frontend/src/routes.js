import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/main';
import Moviments from './pages/Moviments/moviments';
import NewMoviment from './pages/NewMoviment/NewMovient';
import Cliente from './pages/Clients/clients';
import Produto from './pages/Product/product';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Main}/>
                <Route path= "/moviments" component={Moviments}/>
                <Route path= "/newmoviment" component={NewMoviment}/>
                <Route path= "/users" component={Cliente}/>
                <Route path= "/products" component={Produto}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;