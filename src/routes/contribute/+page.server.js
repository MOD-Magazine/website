const API_BASE = 'https://discord.com/api/v10';
const CDN_BASE = 'https://cdn.discordapp.com';

import { DISCORD_TOKEN, GUILD_ID, WRITER_ROLE_ID, DEVELOPER_ROLE_ID } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	/** @type import('discord-api-types/v10').APIGuildMember[] */
	let allMembers = [];

	/** @type {import('discord-api-types/v10').Snowflake | undefined} */
	let lastSnowflake;

	let hasMoreMembers = true;

	while (hasMoreMembers) {
		const members = await getMembers(lastSnowflake);
		allMembers = allMembers.concat(members);

		if (members.length < 1000) {
			hasMoreMembers = false;
		} else {
			lastSnowflake = members[members.length - 1].snowflake;
		}
	}

	const writers = allMembers.filter((member) => member.roles.includes(WRITER_ROLE_ID));
	const developers = allMembers.filter((member) => member.roles.includes(DEVELOPER_ROLE_ID));

	return {
		writers: stripData(writers),
		developers: stripData(developers)
	};
}

/**
 * @param {import('discord-api-types/v10').Snowflake | undefined} snowflake
 * @returns import('discord-api-types/v10').APIGuildMember[]
 */
async function getMembers(snowflake) {
	const after = snowflake != undefined ? `&after=${snowflake}` : '';
	const req = await fetch(`${API_BASE}/guilds/${GUILD_ID}/members?limit=1000${after}`, {
		method: 'GET',
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});
	return req.json();
}

/**
 * @param {import('discord-api-types/v10').APIGuildMember[]} members
 * @returns {{ name: string, avatar: string | undefined }[]}
 */
function stripData(members) {
	return members.map((member) => {
		return {
			name: member.nick ?? member.user?.username ?? 'Unknown',
			avatar: member.avatar
				? `${CDN_BASE}/${GUILD_ID}/guild_id/users/${member.user?.id}/avatars/${member.avatar}.png`
				: `${CDN_BASE}/avatars/${member.user?.id}/${member.user?.avatar}.png`
		};
	});
}
