/**
 * External dependencies
 */
import React from 'react';
import debugFactory from 'debug';
import omit from 'lodash/omit';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import RolesStore from 'lib/site-roles/store';
import RolesActions from 'lib/site-roles/actions';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSelect from 'components/forms/form-select';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import sitesList from 'lib/sites-list';

/**
 * Module variables
 */
const debug = debugFactory( 'calypso:my-sites:people:role-select' );
const sites = sitesList();

export default React.createClass( {
	displayName: 'RoleSelect',

	getInitialState() {
		return ( {
			roles: this.props.siteId ? RolesStore.getRoles( this.props.siteId ) : {}
		} );
	},

	componentDidMount() {
		RolesStore.on( 'change', this.refreshRoles );
		this.fetchRoles();
	},

	componentWillUnmount() {
		RolesStore.removeListener( 'change', this.refreshRoles );
	},

	componentWillReceiveProps( nextProps ) {
		const siteId = nextProps.siteId || this.props.siteId;
		this.fetchRoles( siteId );
		this.refreshRoles( nextProps );
	},

	getWPCOMFollowerRole( siteId ) {
		siteId = siteId ? siteId : this.props.siteId;

		let site = sites.getSite( siteId ),
			displayName = site.is_private
			? this.translate( 'Viewer', { context: 'Role that is displayed in a select' } )
			: this.translate( 'Follower', { context: 'Role that is displayed in a select' } );

		return {
			follower: {
				display_name: displayName,
				name: 'follower'
			}
		};
	},

	refreshRoles( nextProps ) {
		const siteId = nextProps && nextProps.siteId ? nextProps.siteId : this.props.siteId;

		if ( siteId ) {
			let siteRoles = RolesStore.getRoles( siteId );

			if ( this.props.includeFollower ) {
				siteRoles = Object.assign( {}, this.getWPCOMFollowerRole(), siteRoles )
			}

			this.setState( {
				roles: siteRoles
			} );
		}
	},

	fetchRoles( siteId = this.props.siteId ) {
		if ( ! siteId ) {
			debug( 'siteId not set' );
			return;
		}

		if ( Object.keys( RolesStore.getRoles( siteId ) ).length ) {
			debug( 'initial fetch not necessary' );
			return;
		}

		debug( 'Fetching roles for ' + siteId );

		// defer fetch requests to avoid dispatcher conflicts
		setTimeout( function() {
			const fetching = RolesStore.isFetching( siteId );
			if ( fetching ) {
				return;
			}
			RolesActions.fetch( siteId );
		}, 0 );
	},

	render() {
		const roleKeys = Object.keys( this.state.roles );
		return (
			<FormFieldset key={ this.props.key } disabled={ ! roleKeys.length }>
				<FormLabel htmlFor={ this.props.id }>
					{ this.translate( 'Role', {
						context: 'Text that is displayed in a label of a form.'
					} ) }
				</FormLabel>
				<FormSelect { ...omit( this.props, [ 'site', 'key' ] ) }>
					{
						map( this.state.roles, ( roleObject, key ) => {
							return (
								<option value={ key } key={ key }>
									{ roleObject.display_name }
								</option>
							);
						} )
					}
				</FormSelect>
				{ this.props.explanation &&
					<FormSettingExplanation>
						{ this.props.explanation }
					</FormSettingExplanation>
				}
			</FormFieldset>
		);
	}
} );
