/**
 * External dependencies
 */
import classNames from 'classNames';
import React from 'react';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import Gridicon from 'components/gridicon';

const CheckoutThankYouHeader = React.createClass( {
	propTypes: {
		isDataLoaded: React.PropTypes.bool.isRequired,
		isFreeTrial: React.PropTypes.bool.isRequired,
		productName: React.PropTypes.string
	},

	renderHeading() {
		if ( ! this.props.isDataLoaded ) {
			return this.translate( 'Loading…' );
		} else if ( this.props.isFreeTrial ) {
			return this.translate( 'Your 14 day free trial starts today!' );
		}

		return this.translate( 'Thank you for your purchase!' );
	},

	renderText() {
		if ( ! this.props.isDataLoaded ) {
			return this.translate( 'Loading…' );
		} else if ( this.props.productName ) {
			if ( this.props.isFreeTrial ) {
				return this.translate( "We hope you enjoy {{strong}}%(productName)s{{/strong}}. What's next? Take it for a spin!", {
					args: {
						productName: this.props.productName
					},
					components: {
						strong: <strong/>
					}
				} );
			} else {
				return this.translate(
					"You will receive an email confirmation shortly for your purchase of {{strong}}%(productName)s{{/strong}}. What's next?", {
						args: {
							productName: this.props.productName
						},
						components: {
							strong: <strong/>
						}
					}
				);
			}
		}

		return this.translate( "You will receive an email confirmation shortly. What's next?" );
	},

	render() {
		const classes = {
			'checkout-thank-you-header': true,
			'is-placeholder': ! this.props.isDataLoaded
		}

		return (
			<CompactCard className={ classNames( classes ) }>
				<div className="checkout-thank-you-header-content">
					<span className="checkout-thank-you-header__icon">
						<Gridicon icon="trophy" size={ 48 } />
					</span>
					<h1 className="checkout-thank-you-header__heading">
						{ this.renderHeading() }
					</h1>
					<h2 className="checkout-thank-you-header__text">
						{ this.renderText() }
					</h2>
				</div>
			</CompactCard>
		);
	}
} );

export default CheckoutThankYouHeader;
