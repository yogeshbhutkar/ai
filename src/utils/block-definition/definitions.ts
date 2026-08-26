/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlockDefinition } from './registry';
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
		name: 'core/accordion-heading',
		fields: [
			{
				key: 'title',
				role: 'content',
				format: 'html',
				label: __( 'Title', 'ai' ),
			},
		],
	},
	{
		name: 'core/audio',
		fields: [
			{
				key: 'caption',
				role: 'caption',
				format: 'html',
				label: __( 'Caption', 'ai' ),
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
		name: 'core/categories',
		fields: [
			{
				key: 'label',
				role: 'content',
				format: 'plain',
				label: __( 'Label', 'ai' ),
			},
		],
	},
	{
		name: 'core/comments-pagination-next',
		fields: [
			{
				key: 'label',
				role: 'content',
				format: 'plain',
				label: __( 'Label', 'ai' ),
			},
		],
	},
	{
		name: 'core/comments-pagination-previous',
		fields: [
			{
				key: 'label',
				role: 'content',
				format: 'plain',
				label: __( 'Label', 'ai' ),
			},
		],
	},
	{
		name: 'core/cover',
		fields: [
			{
				key: 'alt',
				role: 'alt',
				format: 'plain',
				label: __( 'Alt text', 'ai' ),
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
		name: 'core/embed',
		fields: [
			{
				key: 'caption',
				role: 'caption',
				format: 'html',
				label: __( 'Caption', 'ai' ),
			},
		],
	},
	{
		name: 'core/form-input',
		fields: [
			{
				key: 'label',
				role: 'content',
				format: 'html',
				label: __( 'Label', 'ai' ),
			},
		],
	},
	{
		name: 'core/gallery',
		fields: [
			{
				key: 'caption',
				role: 'caption',
				format: 'html',
				label: __( 'Caption', 'ai' ),
			},
			{
				key: 'alt',
				role: 'alt',
				format: 'plain',
				label: __( 'Alt text', 'ai' ),
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
	{
		name: 'core/media-text',
		fields: [
			{
				key: 'mediaAlt',
				role: 'alt',
				format: 'plain',
				label: __( 'Media alt text', 'ai' ),
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
		name: 'core/video',
		fields: [
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
	registerBlockDefinition( definition );
} );
