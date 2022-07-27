/**
 * To use this one, you need https://github.com/osano/cookieconsent/tree/master or https://www.osano.com/cookieconsent/download/
 * Example: https://3sechzig.eu/
 */

window.addEventListener("load", function () {

	/**
	 * Hide Privacy Controls on Privacy-Page.
	 * Privacy Controls might look like this:
	 * <h3>Data collection</h3>
	 * <p>The data collection by Google Analytics or Leadfeeder only takes place if you have agreed when first opening this website.</p>
	 * <div id="consent-out">
	 *   <p>
	 *     So far, you agreed to the use of Google Analytics and LeadFeeder.<br>
	 *     <a href="#" title="disable">Click to disable.</a>
	 *   </p>
	 * </div>
	 * <div id="consent-in">
	 *   <p>
	 *     So far, you banned the use of Google Analytics and LeadFeeder.<br>
	 *     <a href="#" title="enable">Click to allow.</a>
	 *   </p>
	 * </div>
	 */
	jQuery("#consent-in, #consent-out").hide();

	if (document.cookie.indexOf('cookieconsent_status=allow') > -1) {
		/**
		 * Cookie set and usage is allowed
		 * Show #consent-out Button
		 */
		jQuery("#consent-out").show();
		onConsent();
	} else if (document.cookie.indexOf('cookieconsent_status=deny') > -1) {
		/**
		 * Cookie set and usage is banned
		 * Show #consent-in Button
		 */
		jQuery("#consent-in").show();
	} else {
		/**
		 * Nothing happened yet
		 * Initalise Message
		 */
		window.cookieconsent.initialise({
			"type": 'opt-in',
			onStatusChange: function (status, chosenBefore) {
				var type = this.options.type;
				var didConsent = this.hasConsented();
				if (type == 'opt-in' && didConsent) {
					onConsent();
				}
			}
		});
	}

	/**
	 * Bind Events to Control Buttons on Privacy Page
	 */
	jQuery("#consent-out").click(function (e) {
		e.preventDefault();
		consentOut();
	})
	jQuery("#consent-in").click(function (e) {
		e.preventDefault();
		consentIn();
	})
});

function consentOut() {
	deleteAllCookies();
	document.cookie = 'cookieconsent_status=deny; expires=Thu, 31 Dec 2199 23:59:59 UTC;path=/';
	if (!alert('All services for this website have been deactivated in this browser.')) {
		window.location.reload();
	}
}

function consentIn() {
	document.cookie = 'cookieconsent_status=allow; expires=Thu, 31 Dec 2199 23:59:59 UTC;path=/';
	if (!alert('All services for this website have been activated in this browser.')) {
		window.location.reload();
	}
}

/**
 * Will be run if services allowed
 * e.g. Google Analytics and Leadfeeder
 */
function onConsent() {
	var gaProperty = 'G-BN6MWZLF32';

	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', gaProperty, 'auto');
	ga('set', 'anonymizeIp', true);
	ga('send', 'pageview');

	// (function () {
	// 	window.ldfdr = window.ldfdr || {};
	// 	(function (d, s, ss, fs) {
	// 		fs = d.getElementsByTagName(s)[0];

	// 		function ce(src) {
	// 			var cs = d.createElement(s);
	// 			cs.src = src;
	// 			setTimeout(function () {
	// 				fs.parentNode.insertBefore(cs, fs)
	// 			}, 1);
	// 		}
	// 		ce(ss);
	// 	})(document, 'script', 'https://sc.lfeeder.com/lftracker_v1_xyz.js');
	// })();
}

function deleteAllCookies() {
	var cookies = document.cookie.split("; ");
	for (var c = 0; c < cookies.length; c++) {
		var d = window.location.hostname.split(".");
		while (d.length > 0) {
			var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
			var p = location.pathname.split('/');
			document.cookie = cookieBase + '/';
			while (p.length > 0) {
				document.cookie = cookieBase + p.join('/');
				p.pop();
			};
			d.shift();
		}
	}
	window.localStorage.clear()
}
