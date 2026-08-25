/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlockContent } from './registry';
import type { BlockContentDefinition } from './types';

const contentField = {
	key: 'content',
	role: 'content',
	format: 'html',
	label: __( 'Content', 'ai' ),
} as const;

// Blocks with single-field content.
const contentBlocks = [
	'core/paragraph',
	'core/heading',
	'core/list-item',
	'core/verse',
	'core/preformatted',
] as const;

const definitions = [
	...contentBlocks.map( ( name ) => ( {
		name,
		fields: [ contentField ],
	} ) ),
	{
		name: 'core/quote',
		fields: [
			{
				key: 'citation',
				role: 'citation',
				format: 'html',
				label: __( 'Citation', 'ai' ),
			},
		],
	},
	{
		name: 'core/details',
		fields: [
			{
				key: 'summary',
				role: 'content',
				format: 'html',
				label: __( 'Summary', 'ai' ),
			},
		],
	},
	{
		name: 'core/button',
		fields: [
			{
				key: 'text',
				role: 'content',
				format: 'html',
				label: __( 'Text', 'ai' ),
			},
		],
	},
	{
		name: 'core/pullquote',
		fields: [
			{
				key: 'value',
				role: 'content',
				format: 'html',
				label: __( 'Quote', 'ai' ),
			},
			{
				key: 'citation',
				role: 'citation',
				format: 'html',
				label: __( 'Citation', 'ai' ),
			},
		],
	},
	{
		name: 'core/image',
		fields: [
			{
				key: 'alt',
				role: 'alt',
				format: 'plain',
				label: __( 'Alt text', 'ai' ),
			},
			{
				key: 'caption',
				role: 'caption',
				format: 'html',
				label: __( 'Caption', 'ai' ),
			},
		],
	},
] satisfies BlockContentDefinition[];

// Register block content definitions.
definitions.forEach( ( definition ) => {
	registerBlockContent( definition );
} );
