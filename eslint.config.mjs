import path              from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat }    from '@eslint/eslintrc';
import js                from '@eslint/js';


const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const compat = new FlatCompat( {
	baseDirectory    : __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig        : js.configs.all
} );

const eslintConfig = [
	...compat.extends( 'next/core-web-vitals' ), {
		rules: {
			semi                  : [ 2, 'always' ],
			quotes                : [ 2, 'single' ],
			'sort-imports'        : [
				'error', {
					ignoreCase           : false,
					ignoreDeclarationSort: true,
					ignoreMemberSort     : false,
					memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
					allowSeparatedGroups : true
				}
			],
			'import/no-unresolved': 'error',
			'import/order'        : [
				'error', {
					groups            : [
						'builtin',
						'external',
						'internal',
						[ 'sibling', 'parent' ],
						'index',
						'unknown'
					],
					'newlines-between': 'always',
					alphabetize       : {
						order          : 'asc',
						caseInsensitive: true
					}
				}
			]
		}
	}
];

export default eslintConfig;