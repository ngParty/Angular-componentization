import * as angular from 'angular';
import Tooltip from './tooltip.directive';
import tooltipMessage from './tooltipMessage.directive'
//import tooltipOverflow from './tooltipOverflow.directive'

const ngModule = angular.module( 'tooltip', [] )

    // directive
    .directive( 'nyTooltip', Tooltip.ddo )
    .controller( 'NyTooltip', Tooltip )

    // decorator
    .directive( 'nyTooltipMessage', tooltipMessage )

    // decorator
    //.directive( 'nyTooltipOverflow', tooltipOverflow )
     ;

export default ngModule;