/**
 * Internal dependencies
 */
import type { BlockContentDefinition } from './types';

/**
 * Map of block content definitions.
 *
 * @example
 * ```ts
 * registerBlockContent( {
 * 	name: 'core/paragraph',
 * 	fields: [
 * 		{ key: 'content', role: 'content', format: 'html', label: __( 'Content', 'ai' ) },
 * 	],
 * } );
 * ```
 */
const definitions = new Map< string, BlockContentDefinition >();

/**
 * Register a block content definition.
 *
 * @param definition - The block content definition to register.
 */
export function registerBlockContent(
	definition: BlockContentDefinition
): void {
	definitions.set( definition.name, definition );
}

/**
 * Get a block content definition by name.
 *
 * @param name - The name of the block content definition to get.
 * @return The block content definition, or undefined if not found.
 */
export function getBlockContentDefinition(
	name: string
): BlockContentDefinition | undefined {
	return definitions.get( name );
}

/**
 * Check if a block content definition is registered.
 *
 * @param name - The name of the block content definition to check.
 * @return True if the block content definition is registered, false otherwise.
 */
export function isRegisteredBlock( name: string ): boolean {
	return definitions.has( name );
}
