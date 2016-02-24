/**
 * External dependencies
 */
import memoize from 'lodash/memoize';
import isEqual from 'lodash/isEqual';

export default function createSelector( selector, getDependants = ( state ) => state ) {
	const memoizedSelector = memoize( selector, ( state, ...args ) => args.join() );
	let lastDependants;

	return Object.assign( function( state, ...args ) {
		let currentDependants = getDependants( state );
		if ( ! Array.isArray( currentDependants ) ) {
			currentDependants = [ currentDependants ];
		}

		if ( lastDependants && ! isEqual( currentDependants, lastDependants ) ) {
			memoizedSelector.cache.clear();
		}

		lastDependants = currentDependants;

		return memoizedSelector( state, ...args );
	}, { memoizedSelector } );
}

