import * as angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Tooltip from './tooltip/tooltip'

const componentModule = angular.module('app.components', [
    Tooltip.name
]);

export default componentModule;