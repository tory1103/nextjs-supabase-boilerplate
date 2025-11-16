/**
 * @type {import('semantic-release').GlobalConfig}
 */

const releaseConfig = {
	branches: [
		{ name: 'main' },
		// { name: 'pre', prerelease: 'pre', channel: 'pre' },
		// { name: 'dev', prerelease: 'dev', channel: 'dev' },
	],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{
						breaking: true,
						release: 'major',
					},
					{
						type: 'feat',
						release: 'minor',
					},
					{
						type: 'fix',
						release: 'patch',
					},
					{
						type: 'chore',
						release: false,
					},
				],
				parserOpts: {
					mergeCommitPattern: /^Merge pull request #(\d+) from (.*)$/,
					mergeCorrespondence: ['id'],
				},
			},
		],
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
			},
		],
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
			},
		],
		'@semantic-release/git',
		'@semantic-release/github',
	],
};

export default releaseConfig;
