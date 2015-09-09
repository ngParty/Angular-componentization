import template from './app.html!text';
import './app.css!';

class AppComponent{

    longtext = 'Long text - make shorter';

    static ddo(){
        return {
            controller: 'App',
            controllerAs: 'vm',
            template, // because we have a variable name template we can use the shorcut here
            restrict: 'E'
        };
    }

}
export default AppComponent;
