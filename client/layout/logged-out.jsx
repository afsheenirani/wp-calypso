/** @ssr-ready **/

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import MasterbarMinimal from 'layout/masterbar/minimal';

const LayoutLoggedOut = ( {
	primary,
	secondary,
	tertiary,
	section,
	hasSidebar = true,
	isFullScreen = false
} ) => {
	const classes = classNames( 'wp layout', {
		[ 'is-section-' + section ]: !! section,
		'focus-content': true,
		'has-no-sidebar': ! hasSidebar,
		'full-screen': isFullScreen,
	} );

	return (
		<div className={ classes }>
			<MasterbarMinimal url="/" />
			<div id="content" className="wp-content">
				<div id="primary" className="wp-primary wp-section">
					{ primary }
				</div>
				<div id="secondary" className="wp-secondary">
					{ secondary }
				</div>
			</div>
			<div id="tertiary" className="wp-overlay fade-background">
				{ tertiary }
			</div>
		</div>
	);
}

LayoutLoggedOut.displayName = 'LayoutLoggedOut';
LayoutLoggedOut.propTypes = {
	primary: React.PropTypes.element,
	secondary: React.PropTypes.element,
	tertiary: React.PropTypes.element,
	section: React.PropTypes.oneOfType( [
		React.PropTypes.string,
		React.PropTypes.bool
	] ),
	hasSidebar: React.PropTypes.bool,
	isFullScreen: React.PropTypes.bool
}

export default connect(
	state => ( {
		section: state.ui.section,
		hasSidebar: state.ui.hasSidebar,
		isFullScreen: state.ui.isFullScreen,
	} )
)( LayoutLoggedOut );
