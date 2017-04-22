var ClusterSlide = {

    initSlide: function(map, cluster, infowindow){
      var cs = this;

      current_zoom = map.getZoom();
      map_max_zoom = map.maxZoom;
      cluster_size = cluster.getSize();
      template_id = '#infobox-template';


      // Determining if the max zoom has been reached with still markers inside
      if (current_zoom == map_max_zoom && cluster_size > 1) {
        marker_counter = 0;

        var popup ='<div class="pop-up"><strong></strong></div>' ;

        infowindow.setContent( popup );
        infowindow.setPosition(cluster.getCenter());
        infowindow.open(map);


        //Get markers
        var markers = cluster.getMarkers();
        this.displayWindow(markers[marker_counter].id, template_id);
        marker_counter = this.getMarkerCounter(marker_counter, "next", cluster_size);

        $("body").on('click', '.prev-pop', function () {
        cs.displayWindow(markers[marker_counter].id, template_id);

        marker_counter = cs.getMarkerCounter(marker_counter, "prev", cluster_size);
        });

        $("body").on('click', '.next-pop', function () {
        cs.displayWindow(markers[marker_counter].id, template_id);

        marker_counter = cs.getMarkerCounter(marker_counter, "next", cluster_size);
        });




      }
    },

    displayWindow : function (info, template_id){
      $('.pop-up').empty();

      // Retrieve the template data from the HTML (jQuery is used here).
      var template = $(template_id).html();

      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);

      var context = { "id" : info };

      // html = 'My name is Ritesh Kumar. I am a developer.'
      var html = templateScript(context);

      // Insert the HTML code into the page
      $('.pop-up').append(html);

    },


    getMarkerCounter : function (marker_counter, action, cluster_size) {
    if (marker_counter == 0 && action == "prev") {
        marker_counter = cluster_size - 1;
    }
    if (marker_counter == cluster_size - 1 && action == "next") {
        marker_counter = 0;
    }
    else {
        marker_counter++;
    }
    return marker_counter;
},

}
