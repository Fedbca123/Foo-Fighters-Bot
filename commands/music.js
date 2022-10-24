import { SlashCommandBuilder } from 'discord.js';
import { state } from '../bot.js';
import {
	AudioPlayerStatus,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus,
	createAudioPlayer,
	createAudioResource,
	StreamType,
	VoiceConnectionDisconnectReason,
} from '@discordjs/voice';
import { readFileSync } from 'fs';
import { promisify } from 'util';

let curState = { idle: idle };
state.curState = curState;

function idle() {
	console.log(' Starting idle.');

	curState.isIdle = true;
	curState.handle = undefined;
	curState.channel = undefined;
	curState.audioPlayer?.stop();
	curState.audioPlayer = undefined;
	curState.connection?.destroy();
	curState.connection = undefined;

	let largest;
	let largestSize = 0;

	for (const yeet in state.voiceChannels) {
		if (state.voiceChannels[yeet].size > largestSize) {
			largest = yeet;
			largestSize = state.voiceChanels[yeet].size;
		}
	}

	if (largestSize != 0) {
		queueNextSong(1000);
		curState.isIdle = false;
		return;
	}

	curState.handle = setTimeout(idle, 600_000);
}

async function playMusic() {
	curState.handle = undefined;

	let largest;
	let largestSize = 0;

	for (const yeet in state.voiceChannels) {
		if (state.voiceChannels[yeet].size > largestSize) {
			largest = yeet;
			largestSize = state.voiceChanels[yeet].size;
		}
	}

	if (largestSize == 0) {
		idle();
		return;
	}

	curState.isIdle = false;
}
