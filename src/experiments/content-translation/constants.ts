/**
 * Internal dependencies
 */
import type { FieldSelector } from '../../utils/block-content';

/**
 * A default minimum content length for enabling content translation.
 */
export const TRANSLATION_MINIMUM_CONTENT_COUNT_DEFAULT = 5;

/**
 * Notice ID for the content translation error notice.
 */
export const TRANSLATION_NOTICE_ID = 'ai_content_translation';

/**
 * Batch size for content translation.
 */
export const TRANSLATION_BATCH_SIZE = 4;

/**
 * Supported field roles for content translation.
 */
export const TRANSLATION_FIELD_SELECTOR: FieldSelector = {
	roles: [ 'content', 'caption', 'citation', 'alt' ],
};

/**
 * Loading classes for the content translation process.
 */
export const TRANSLATION_LOADING_CLASSES = {
	TITLE: 'ai-content-translation--is-title-loading',
	BLOCKS: 'ai-content-translation--is-blocks-loading',
} as const;
