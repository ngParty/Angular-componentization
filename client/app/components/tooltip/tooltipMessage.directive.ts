import {ITooltip, ITooltipAttrs} from './tooltip.directive';

function tooltipMessage() {
    return {
        restrict: 'A',
        require: 'nyTooltip',

        link: (
            scope: ng.IScope,
            element: ng.IAugmentedJQuery,
            attrs: ITooltipAttrs,
            TooltipController: ITooltip
        ) => {

            scope.$watch( attrs.nyTooltipMessage, ( message: string ) => {

                TooltipController.setState( { message } );

            } );

        }
    }
}

export default  tooltipMessage;