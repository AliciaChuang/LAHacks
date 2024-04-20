import Leaflet from 'leaflet'

export default function getMarkerIcon(color = '') {
    return Leaflet.divIcon({
        /**
         * Adds offset to __marker__ for stacking markers.
         */
        iconAnchor: [28, 46],

        /**
         * Adds offset to __popup__ for stacking markers.
         */
        popupAnchor: [17, 46],

        /**
         * Removes styling added by leaflet classes.
         */
        className: '',

        /**
         * what the marker will look like
         */
        html: `<div style="position:relative;">
             <span style="background-color: ${color};
                   width: 1.75rem;
                   height: 1.75rem;
                   left: 0px;
                   top: 0px;
                   display: block;
                   border-radius: 1.9rem 1.9rem 0;
                   transform: rotate(45deg);
                   border: 1px solid #FFFFFF">
             </span>
             <div style="width: 1.75rem;
                         height: 1.75rem;
                         left: 0px;
                         top: 0px;
                         text-align: center; 
                         color: white" >
             </div>
           </div>`,
    });
}