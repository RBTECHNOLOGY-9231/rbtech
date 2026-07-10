(function () {
    function checkStatus() {
        fetch('/api/k3r8x2n6?t=' + Date.now())
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var overlay = document.getElementById('server-error');
                if (!overlay) return;
                if (data && data.active === false) {
                    overlay.style.display = 'flex';
                } else {
                    overlay.style.display = 'none';
                }
            })
            .catch(function () {
            });
    }

    checkStatus();
    setInterval(checkStatus, 2000);
})();
