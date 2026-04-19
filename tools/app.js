$(document).ready(function() {
    initTools();

    var currentPanel = 'home';
    showPanel('home');

    $(".dropdown-item").click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        if (href && href.startsWith("#")) {
            var panelId = href.substring(1);
            showPanel(panelId);
        }
    });

    $("a.btn").click(function(e) {
        var href = $(this).attr("href");
        if (href && href.startsWith("#")) {
            var panelId = href.substring(1);
            showPanel(panelId);
        }
    });

    function showPanel(panelId) {
        $(".tool-panel").hide();
        $("#" + panelId).show();
        currentPanel = panelId;
        window.location.hash = panelId;
    }

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        if ($("#" + hash).length > 0) {
            showPanel(hash);
        }
    }

    $(window).on('hashchange', function() {
        if (window.location.hash) {
            var hash = window.location.hash.substring(1);
            if ($("#" + hash).length > 0) {
                showPanel(hash);
            }
        }
    });

    $('.dropdown-toggle').dropdown();

    $('[data-toggle="collapse"]').click(function() {
        var target = $(this).data('target');
        $(target).toggle();
    });
});