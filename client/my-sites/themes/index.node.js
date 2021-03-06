/**
 * Internal dependencies
 */
import config from 'config';
import { makeLoggedOutLayout } from 'controller';
import { details, fetchThemeDetailsData } from './controller';
import { setSection } from 'state/ui/actions';

function dispatchSetSection( context, next ) {
	context.store.dispatch( setSection( 'themes', {
		hasSidebar: false,
		isFullScreen: true
	} ) );
	next();
}

// FIXME: These routes will SSR the logged-out Layout even if logged-in.
// While subsequently replaced by the logged-in Layout on the client-side,
// we'll want to render it on the server, too.

// `logged-out` middleware isn't SSR-compliant yet, but we can at least render
// the layout.
// FIXME: Also create loggedOut/multiSite/singleSite elements, depending on route.
const designRoutes = {
	'/design': [ dispatchSetSection, makeLoggedOutLayout ],
	'/design/type/:tier': [ dispatchSetSection, makeLoggedOutLayout ]
};

const themesRoutes = {
	'/theme/:slug/:section?/:site_id?': [ fetchThemeDetailsData, details, makeLoggedOutLayout ]
};

const routes = Object.assign( {},
	config.isEnabled( 'manage/themes' ) ? designRoutes : {},
	config.isEnabled( 'manage/themes/details' ) ? themesRoutes : {}
)

export default function( router ) {
	Object.keys( routes ).forEach( route => {
		router( route, ...routes[ route ] );
	} )
};
