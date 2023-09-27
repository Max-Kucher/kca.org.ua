   # HEAD
   
   <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      let params = new URLSearchParams(window.location.search);
      let metricaParam = params.get("ym_metrica");

      if (metricaParam !== null) {
        (function (m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function () {
              (m[i].a = m[i].a || []).push(arguments);
            };
          m[i].l = 1 * new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
              return;
            }
          }
          (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
        })(
          window,
          document,
          "script",
          "https://mc.yandex.ru/metrika/tag.js",
          "ym"
        );

        ym(+metricaParam, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        });
      }
    </script>
    <!-- /Yandex.Metrika counter -->

# FORM RESPONSE

(function () {
    thanksPopup.style.opacity = "1";
    thanksPopup.style.visibility = "visible";

    let link = document.createElement("a");
    link.href = "assets/top.pdf";
    link.download = "top.pdf";
    link.click();

    let params = new URLSearchParams(
        window.location.search
    );
    let metricaParam = params.get("ym_metrica");

    if (metricaParam !== null) {
        ym(+metricaParam, "reachGoal", "js_lead");
    }
})();