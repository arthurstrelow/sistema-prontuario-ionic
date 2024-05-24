import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/Abertura';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Paciente */
import Inicio from "./pages/paciente/inicio";
import Perfil from './pages/paciente/perfil'
import Consulta from "./pages/paciente/consulta";


/* Médico */


/* Funcionario */


/* Autenticacao */
import Entrar from './pages/autenticacao/entrar';
import EsqueceuSenha from './pages/autenticacao/esqueciSenha';
import VerificarCodigo from './pages/autenticacao/verificacaoCodigo';
import NovaSenha from "./pages/autenticacao/novaSenha";
import ConfirmacaoSenha from "./pages/autenticacao/confirmacaoSenha";


/* Geral */
import Abertura from './pages/Abertura';
import React from "react";



setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/" component={Abertura} />
            <Route exact path="/entrar" component={Entrar} />
            <Route exact path="/esqueceu-senha" component={EsqueceuSenha} />
            <Route exact path="/codigo" component={VerificarCodigo} />
            <Route exact path="/nova-senha" component={NovaSenha} />
            <Route exact path="/confirmacao-senha" component={ConfirmacaoSenha} />
            <Route exact path="/inicio" component={Inicio} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/consulta/:id" component={Consulta} />

            {/* Se nenhuma rota corresponder, redireciona para a página inicial */}
            <Redirect to="/inicio" />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
);

export default App;
