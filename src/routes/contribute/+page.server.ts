// @ts-ignore You need to set up a .env file to not get these errors - not really worth it.
import { DISCORD_TOKEN, GUILD_ID, WRITER_ROLE_ID, DEVELOPER_ROLE_ID } from "$env/static/private";
import type { APIGuildMember, Snowflake } from "discord-api-types/v10";

const API_BASE = "https://discord.com/api/v10";
const CDN_BASE = "https://cdn.discord.com";

type Contributor = {
	name: string;
	avatar: string | undefined;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let allMembers: APIGuildMember[] = [];
	let lastSnowflake: Snowflake | undefined;
	let hasMoreMembers = true;

	while (hasMoreMembers) {
		const members = await getMembers(lastSnowflake);
		allMembers = allMembers.concat(members);

		if (members.length < 1000) {
			hasMoreMembers = false;
		} else {
			lastSnowflake = members[members.length - 1].user?.id;
		}
	}

	return {
		writers: allMembers.filter((member) => member.roles.includes(WRITER_ROLE_ID)).map(stripData),
		developers: allMembers
			.filter((member) => member.roles.includes(DEVELOPER_ROLE_ID))
			.map(stripData),
	};
}

async function getMembers(snowflake: Snowflake | undefined): Promise<APIGuildMember[]> {
	const after = snowflake != undefined ? `&after=${snowflake}` : "";
	const req = await fetch(`${API_BASE}/guilds/${GUILD_ID}/members?limit=1000${after}`, {
		method: "GET",
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`,
		},
	});

	return req.json();
}

function stripData(member: APIGuildMember): Contributor {
	return {
		name: member.user?.username ?? "Unknown",
		avatar: member.avatar
			? `${CDN_BASE}/${GUILD_ID}/guild_id/users/${member.user?.id}/avatars/${member.avatar}.png`
			: `${CDN_BASE}/avatars/${member.user?.id}/${member.user?.avatar}.png`,
	};
}
