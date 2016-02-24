import React, { PropTypes } from 'react';

import Main from 'components/main';
import Card from 'components/card';
import FormLabel from 'components/forms/form-label';
import SiteURLInput from './site-url-input';
import ConnectHeader from './connect-header';
import LoggedOutForm from 'components/logged-out-form';
import LoggedOutFormLinks from 'components/logged-out-form/links';
import LoggedOutFormLinkItem from 'components/logged-out-form/link-item';
import Dialog from 'components/dialog';
import Notice from 'components/notice';
const pluginURL = '/wp-admin/plugin-install.php?tab=plugin-information&plugin=jetpack';

export default React.createClass( {
	displayName: 'JetpackConnectSiteURLEntry',

	getInitialState() {
		return {
			showDialog: false,
			isError: false,
			jetpackNotInstalled: null,
			jetpackIsDeactivated: null,
			jetpackIsDisconnected: null,
			jetpackIsValid: null
		};
	},

	onCloseDialog() {
		this.setState( { showDialog: false } );
	},

	onShowDialog() {
		this.setState( { showDialog: true } );
	},

	goToPluginInstall() {
		window.location = 'http://' + this.refs.siteUrlInputRef.state.value + pluginURL;
	},

	onClick() {
		const stepToShow = Math.floor( ( Math.random() * 5 ) + 1 );

		if( stepToShow === 1 ) {
			this.setState( { 'isError': true } );
		} else if ( stepToShow === 2) {
			this.setState( { jetpackNotInstalled: true } );
		} else if ( stepToShow === 3) {
			this.setState( { jetpackIsDeactivated: true } );
		} else if ( stepToShow === 4) {
			this.setState( { jetpackIsDisconnected: true } );
		} else if ( stepToShow === 5) {
			this.setState( { jetpackIsValid: true } );
		}

	},

	onDismissClick() {
		this.setState( {
			isError: false,
			jetpackNotInstalled: false,
			jetpackIsValid: false,
			jetpackIsDeactivated: false,
			jetpackIsDisconnected: false
		} );
	},

	render() {
		const dialogButtons = [ {
				action: 'cancel',
				label: this.translate( 'Cancel' )
			},
			{
				action: 'install',
				label: this.translate( 'Connect Now' ),
				onClick: this.goToPluginInstall,
				isPrimary: true
			}
		];

		return (
			<Main className="jetpack-connect__main">
				<Dialog
					isVisible={ this.state.showDialog }
					onClose={ this.onCloseDialog }
					additionalClassNames="jetpack-connect__wp-admin-dialog"
					buttons={ dialogButtons } >

					<h1>{ this.translate( 'Hold on there, Sparky.' ) }</h1>
					<img
						className="jetpack-connect__install-wp-admin"
						src="/calypso/images/jetpack/install-wp-admin.svg"
						width={ 400 }
						height={ 294 } />
					<p>{ this.translate( 'We need to send you to your WordPress install so you can approve the Jetpack installation. Click the button in the bottom-right corner on the next screen to continue.' ) }</p>
				</Dialog>

				<div className="jetpack-connect__site-url-entry-container">
					<ConnectHeader
						headerText={ this.translate( 'Connect a self-hosted WordPress' ) }
						subHeaderText={ this.translate( 'We\'ll be installing the Jetpack plugin so WordPress.com can connect to your self-hosted WordPress site.' ) }
						step={ 1 }
						steps={ 3 } />

					<Card className="jetpack-connect__site-url-input-container">
						{ this.state.isError
							? ( <Notice
								status="is-warning"
								onDismissClick={ this.onDismissClick }
								text="That's not a real web site!" /> )
							: null
						}
						{ this.state.jetpackNotInstalled
							? ( <Notice
								status="is-error"
								onDismissClick={ this.onDismissClick }
								text="Jetpack isn't installed!" /> )
							: null
						}
						{ this.state.jetpackIsDeactivated
							? ( <Notice
								status="is-warning"
								onDismissClick={ this.onDismissClick }
								text="Jetpack is installed but deactivated!" /> )
							: null
						}
						{ this.state.jetpackIsDisconnected
							? ( <Notice
								status="is-warning"
								onDismissClick={ this.onDismissClick }
								text="Jetpack is installed but disconnected!" /> )
							: null
						}
						{ this.state.jetpackIsValid
							? ( <Notice
								status="is-success"
								onDismissClick={ this.onDismissClick }
								text="Jetpack is installed!" /> )
							: null
						}
						<FormLabel>{ this.translate( 'Site Address' ) }</FormLabel>
						<SiteURLInput
							ref="siteUrlInputRef"
							onClick={ this.onClick }
							isError={ this.state.isError } />
					</Card>

					<LoggedOutFormLinks>
						<LoggedOutFormLinkItem href="http://jetpack.com">{ this.translate( 'Install Jetpack Manually' ) }</LoggedOutFormLinkItem>
						<LoggedOutFormLinkItem href="/start">{ this.translate( 'Start a new site on WordPress.com' ) }</LoggedOutFormLinkItem>
					</LoggedOutFormLinks>
				</div>
			</Main>

		);
	}
} );
