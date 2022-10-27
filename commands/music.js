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

	let channel = state.voiceChannels[largest].chan;

	joinVoiceChannel(channel);

	try{
		await entersState(curState.connection, VoiceConnectionStatus.Ready, 20e3);
	} catch(e){
		console.warn(e);
		curState.notifChannel.send(`Failed to join the voice channel ${channel.id} in 20s. <@${currState.notifUser.id}>`).catch(console.warn);
		return;
	}

	const file = files[getRandomInt(files.length, 0)];

	const resource = createAudioResource(baseurl + file + params, {
		inputType: StreamType.Arbitrary,
	});

	console.log(`Current song time: ${file}.\tSongs left: ${currState.maxcurr}`);

	currState.audioPlayer.play(resource);

}

function joinVoiceChannel(channel){

	if (currState.channel === channel) {
        console.log(`Already conencted to ${channel.name}`);
        return;
    }

    currState.channel = channel;

    currState.connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: currState.guild.id,
        adapterCreator: currState.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
    });
    currState.connection.on('error', console.warn);
    currState.connection.on('error', () => {
        currState.connection = undefined;
        currState.channel = undefined;
    });
    // borrowed from https://github.com/discordjs/voice/blob/main/examples/music-bot/src/music/subscription.ts#L32
    currState.connection.on('stateChange', async (_, newState) => {
        if (newState.status === VoiceConnectionStatus.Disconnected) {
            if (newState.reason === VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
                try {
                    await entersState(currState.connection, VoiceConnectionStatus.Connecting, 5_000);
                } catch {
                    currState.connection.destroy();
                }
            } else if (currState.connection.rejoinAttempts < 5) {
                await wait((currState.connection.rejoinAttempts + 1) * 5_000);
                currState.connection.rejoin();
            } else {
                currState.connection.destroy();
            }
        } else if (newState.status === VoiceConnectionStatus.Destroyed) {
        } else if (
            newState.status === VoiceConnectionStatus.Connecting ||
            newState.status === VoiceConnectionStatus.Signalling
        ) {
            try {
                await entersState(currState.connection, VoiceConnectionStatus.Ready, 20_000);
            } catch {
                if (currState.connection.state.status !== VoiceConnectionStatus.Destroyed)
                    currState.connection.destroy();
            }
        }
    });

    currState.audioPlayer = createAudioPlayer();
    currState.audioPlayer.on('stateChange', (oldState, newState) => {
        if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
            // just finished playing something, do some sort of interesting logic here about queing the next curr call
            queueNextSong();
            return;
        }
        if (newState.status === AudioPlayerStatus.Playing) {
            // TODO possible use of metadata to do on start and on stop logic?
        }
    });
    currState.audioPlayer.on('error', console.warn);

    currState.connection.subscribe(currState.audioPlayer);
}

function queueNextSong(miliTiNext){

	if (currState.maxAnnoy == 0) {
        console.log('No more songs left, stopping.');
        currState.channel = undefined;
        currState.audioPlayer?.stop();
        currState.audioPlayer = undefined;
        currState.connection?.destroy();
        currState.connection = undefined;
        return;
    }

    if (currState.maxAnnoy > 0) {
        currState.maxAnnoy--;
    }

    let timeTillNext = getRandomInt(currState.max + 1, minTime) * 1000;

    if (miliTilNext) {
        timeTillNext = miliTilNext;
    }

    console.log(`Queued annoy task to occur in ${timeTillNext}ms (${timeTillNext / 1000}s)`);

    currState.handle = setTimeout(annoy, timeTillNext);
}

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default {
	data: new SlashCommandBuilder().setName('music').setDescription('lets you play music').addIntegerOption(option => option.setName('max time').setDescription(
                    `The max time between triggers in s. Min time is ${minTime} seconds. Use with 0 to disable.`
                )
        )
        .addIntegerOption(option =>
            option
                .setName('maxsounds')
                .setDescription('The max number of sounds until the command needs to be called again.')
        ),
    execute,
}